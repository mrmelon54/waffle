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
    return nestedLookup(data, v);
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
    if (!v) return undefined;
  }
  return v;
}

export function magicGetFunc(b, k) {
  if (b[k]) return b[k];
  if (b.$ref && b.$ref[k]) return b.$ref[k];
  return undefined;
}

export function magicGetInFunc(b, k) {
  let z = safeNestedLookup(b, k);
  if (z) return z;
  if (!b.$ref) return undefined;
  let y = safeNestedLookup(b.$ref, k);
  if (y) return y;
  return undefined;
}

export function magicGetAllProperties(b) {
  let a1 = magicGetFunc(b, "properties");
  let a2 = magicGetFunc(b, "allOf");
  let a3 = magicGetFunc(b, "anyOf");
  let a4 = magicGetFunc(b, "oneOf");
  let k = [];
  if (a1) k = [Object.keys(a1)];
  else if (a2) {
    for (let x of a2) k.push(...magicGetAllProperties(x));
  } else if (a3) {
    k = a3.map((x) => magicGetAllProperties(x));
  } else if (a4) {
    k = a4.map((x) => magicGetAllProperties(x));
  }
  return k;
}
