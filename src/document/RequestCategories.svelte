<script lang="ts">
  import type { ComponentsObject } from "../utils/oapi/objects/ComponentsObject";
  import type { OperationObject } from "../utils/oapi/objects/OperationObject";

  import { getPathOpOrder } from "../utils/oapi/objects/PathItemObject";
  import type { PathsObject } from "../utils/oapi/objects/PathsObject";
  import type { TagObject } from "../utils/oapi/objects/TagObject";
  import { getOrDefault } from "../utils/oapi/utils/ObjectUtils";
  import type OpenApiFile from "../utils/oapi/utils/OpenApiFile";
  import type OpenApiParser from "../utils/oapi/utils/OpenApiParser";
  import Ref from "../utils/oapi/utils/Ref";
  import RequestCategory from "./RequestCategory.svelte";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let tags: TagObject[];
  export let paths: PathsObject;
  export let components: ComponentsObject;

  let defaultCategory: TagObject = { name: "default", $$requests: [] };
  let rawTags =
    tags !== undefined
      ? tags.map((x) => {
          x.$$requests = [];
          return x;
        })
      : [];

  async function generateOperations(): Promise<TagObject[]> {
    let categories = [defaultCategory, ...rawTags];
    let rawPaths: PathsObject = getOrDefault(paths, {});

    for (let [pathKey, rawPathItem] of Object.entries(rawPaths)) {
      let pathItem = await Ref.getValueOrRef(_p, _f, rawPathItem, async (x) => x);
      for (let met of getPathOpOrder(pathItem.v)) {
        let opz: OperationObject | undefined = pathItem.v[met.name];
        if (opz === undefined) continue;
        let op = opz!;
        op.$$path = pathKey;
        op.$$method = met;
        if (op.parameters !== undefined) op.$$params = op.parameters!;
        else if (pathItem.v.parameters !== undefined) op.$$params = pathItem.v.parameters!;
        else op.$$params = [];
        putInCategory(categories, op);
      }
    }

    if (defaultCategory.$$requests.length === 0) categories.splice(0, 1);
    return categories;
  }

  function putInCategory(categories: TagObject[], req: OperationObject) {
    let tags = getOrDefault(req.tags, []);
    if (tags.length >= 1) {
      let tag = tags[0];
      let cat = findCategory(categories, tag);
      if (cat !== undefined) cat.$$requests.push(req);
      else {
        let o: TagObject = { name: tag, $$requests: [req] };
        categories.push(o);
      }
      return;
    }
    defaultCategory.$$requests.push(req);
  }

  function findCategory(categories: TagObject[], tag: string) {
    for (let x of categories) {
      if (x.name == tag) return x;
    }
    return undefined;
  }
</script>

<div class="request-categories">
  {#await generateOperations()}
    Loading categories...
  {:then x}
    {#each x as category, i}
      {#if i != 0}
        <div class="req-cat-gap" />
      {/if}
      <RequestCategory {_p} {_f} open={true} {category} />
    {/each}
  {:catch err}
    <div>{err}</div>
  {/await}
</div>

<style>
  .req-cat-gap {
    height: 16px;
  }
</style>
