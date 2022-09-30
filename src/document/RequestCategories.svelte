<script lang="ts">
  import ComponentsObject from "../utils/oapi/objects-old/ComponentsObject";
  import OperationObject from "../utils/oapi/objects-old/OperationObject";
  import PathItemObject from "../utils/oapi/objects-old/PathItemObject";
  import { PathsObject } from "../utils/oapi/objects-old/PathsObject";
  import TagObject from "../utils/oapi/objects-old/TagObject";
  import Optional from "../utils/Optional";
  import RequestCategory from "./RequestCategory.svelte";

  export let tags: Optional<TagObject[]>;
  export let paths: Optional<PathsObject>;
  export let components: Optional<ComponentsObject>;

  let defaultCategory = TagObject.parse({ name: "default", description: "" }).get();
  let rawTags = tags.isFull() ? tags.get() : [];
  let categories = [defaultCategory, ...rawTags];

  let rawPaths: Map<string, PathItemObject> = paths.isFull() ? paths.get() : new Map();
  for (let [pathKey, pathItem] of rawPaths.entries()) {
    for (let met of pathItem.opOrder) {
      let opz: Optional<OperationObject> = pathItem[met.name];
      if (opz.isEmpty()) continue;
      let op = opz.get();
      op.$$path = pathKey;
      op.$$method = met;
      if (op.parameters !== undefined && op.parameters.isFull()) op.$$params = op.parameters.get();
      else if (pathItem.parameters !== undefined && pathItem.parameters.isFull()) op.$$params = pathItem.parameters.get();
      else op.$$params = [];
      putInCategory(op);
    }
  }

  if (defaultCategory.$$requests.length === 0) categories.splice(0, 1);

  function putInCategory(req: OperationObject) {
    let tags = req.tags ? req.tags.getOrDefault([]) : [];
    if (tags.length >= 1) {
      let tag = tags[0];
      let cat = findCategory(tag);
      if (cat !== undefined) cat.$$requests.push(req);
      else {
        let o = TagObject.parse({ name: tag }).get();
        o.$$requests = [req];
        categories.push(o);
      }
      return;
    }
    defaultCategory.$$requests.push(req);
  }

  function findCategory(tag: string) {
    for (let x of categories) {
      if (x.name == tag) return x;
    }
    return undefined;
  }
</script>

<div class="request-categories">
  {#each categories as category, i}
    {#if i != 0}
      <div class="req-cat-gap" />
    {/if}
    <RequestCategory open={true} {category} />
  {/each}
</div>

<style>
  .req-cat-gap {
    height: 16px;
  }
</style>
