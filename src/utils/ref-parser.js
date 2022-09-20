import yaml from "js-yaml";

export default class RefParser {
  cacheFiles = {};

  constructor() {}

  async remoteFetch(url) {
    let resp = await fetch(url);
    return await resp.text();
  }

  async dereferenceFromJson(data) {
    let v = JSON.parse(data);
    return await this.dereferenceFromObject(v);
  }

  async dereferenceFromYaml(data) {
    let v = yaml.load(data);
    return await this.dereferenceFromObject(v);
  }

  async dereferenceFromObject(v) {
    let l = this.parseRefs(v);
    let refs = l.map((x) => ({ key: x, value: nestedLookup(v, x) }));
    let [local, remote] = this.splitRefTypes(refs);
    await this.fetchRemoteRefs(remote);
    return this.mergeRefs(v, local, remote);
  }

  async dereferenceFromUrl(url) {
    let f = await this.remoteFetch(url);
    try {
      return await this.dereferenceFromJson(f);
    } catch (e1) {
      try {
        return await this.dereferenceFromYaml(f);
      } catch (e2) {
        console.error(`MULTIPLE ERRORS:`);
        console.error(e1);
        console.error(e2);
      }
    }
    return await Promise.reject("Invalid download");
  }

  parseRefs(v) {
    let [z, todo] = this.parseSingleRefLayer([], v);
    while (todo.length > 0) {
      let t = todo.shift();
      let [x, y] = this.parseSingleRefLayer(t.path, t.value);
      z.push(...x);
      todo.push(...y);
    }
    return z;
  }

  parseSingleRefLayer(p, v) {
    let z = [];
    let todo = [];
    for (let a in v) {
      if (a === "$ref") z.push([...p, a]);
      else if (Array.isArray(v[a])) todo.push({ type: "array", path: [...p, a], value: v[a] });
      else if (typeof v[a] === "object") todo.push({ type: "object", path: [...p, a], value: v[a] });
    }
    return [z, todo];
  }

  splitRefTypes(refs) {
    let local = [];
    let remote = [];
    for (let i of refs) {
      if (i.value[0] == "#") local.push(i);
      else remote.push(remote);
    }
    return [local, remote];
  }

  fetchLocalRef(data, ref) {
    let v = ref.split("/").slice(1);
    return { $name: v[v.length - 1], ...nestedLookup(data, v) };
  }

  fetchCacheRef() {
    // TODO: lol
  }

  async fetchRemoteRefs(l) {
    let that = this;
    return await Promise.all(
      Array.from(new Set(l)).map(async (x) => {
        if (that.cacheFiles[x]) return Promise.resolve();
        that.cacheFiles[x] = await this.remoteFetch(x);
        return Promise.resolve();
      })
    );
  }

  mergeRefs(v, local, remote) {
    let that = this;
    for (let i of local) {
      let a = safeNestedLookup(v, i.key.slice(0, -1));
      a.$ref = that.fetchLocalRef(v, i.value);
    }
    for (let i of remote) {
      let a = safeNestedLookup(v, i.key.slice(0, -1));
      a.$ref = that.fetchCacheRef(v, i.value);
    }

    console.log(v);
    return v;
  }
}

function nestedLookup(data, ref) {
  let v = data;
  for (let a of ref) v = v[a];
  return v;
}

function safeNestedLookup(data, ref) {
  let v = data;
  for (let a of ref) {
    v = v[a];
    if (v == undefined) return undefined;
  }
  return v;
}

export function magicGetFunc(b, k) {
  if (b[k] !== undefined) return b[k];
  if (b.$ref !== undefined && b.$ref[k]) return b.$ref[k];
  if (b.allOf !== undefined)
    for (let x of b.allOf) {
      let z = magicGetFunc(x, k);
      if (z !== undefined) return z;
    }
  if (b.anyOf !== undefined)
    for (let x of b.anyOf) {
      let z = magicGetFunc(x, k);
      if (z !== undefined) return z;
    }
  if (b.oneOf !== undefined)
    for (let x of b.oneOf) {
      let z = magicGetFunc(x, k);
      if (z !== undefined) return z;
    }
  return undefined;
}

export function magicGetInFunc(b, k) {
  let z1 = safeNestedLookup(b, k);
  if (z1 !== undefined) return z1;
  if (b.$ref !== undefined) {
    let z2 = safeNestedLookup(b.$ref, k);
    if (z2 !== undefined) return z2;
  }
  if (b.allOf !== undefined)
    for (let x of b.allOf) {
      let z = magicGetInFunc(x, k);
      if (z !== undefined) return z;
    }
  if (b.anyOf !== undefined)
    for (let x of b.anyOf) {
      let z = magicGetInFunc(x, k);
      if (z !== undefined) return z;
    }
  if (b.oneOf !== undefined)
    for (let x of b.oneOf) {
      let z = magicGetInFunc(x, k);
      if (z !== undefined) return z;
    }
  return undefined;
}

export function magicGetSingleProperty(b, k) {
  let a1 = magicGetFunc(b, "properties");
  let a2 = magicGetFunc(b, "allOf");
  let a3 = magicGetFunc(b, "anyOf");
  let a4 = magicGetFunc(b, "oneOf");
  let p;
  if (a1 && a1[k]) p = a1[k];
  if (a2 !== undefined) {
    for (let x of a2) {
      p = magicGetSingleProperty(x, k);
      if (p !== undefined) return p;
    }
  }
  if (a3 !== undefined) {
    for (let x of a3) {
      p = magicGetSingleProperty(x, k);
      if (p !== undefined) return p;
    }
  }
  if (a4 !== undefined) {
    for (let x of a4) {
      p = magicGetSingleProperty(x, k);
      if (p !== undefined) return p;
    }
  }
  return p;
}

export function magicGetAllProperties(b) {
  let a1 = magicGetFunc(b, "properties");
  let a2 = magicGetFunc(b, "allOf");
  let a3 = magicGetFunc(b, "anyOf");
  let a4 = magicGetFunc(b, "oneOf");
  let k = [];
  if (a1 !== undefined) k.push(Object.keys(a1));
  else if (a2 !== undefined) {
    for (let x of a2) k.push(...magicGetAllProperties(x));
  } else if (a3 !== undefined) {
    k = a3.map((x) => magicGetAllProperties(x));
  } else if (a4 !== undefined) {
    k = a4.map((x) => magicGetAllProperties(x));
  }
  return k;
}
