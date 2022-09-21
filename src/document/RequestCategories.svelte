<script>
  import Dropdown from "../components/Dropdown.svelte";
  import RequestView from "../components/RequestView.svelte";
  import methods from "../utils/methods";
  import { magicGetFunc } from "../utils/ref-parser";

  export let tags;
  export let paths;
  export let components;

  let defaultCategory = { name: "default", description: "", requests: [] };
  let categories = [defaultCategory, ...tags.map((x) => ({ ...x, requests: [] }))];

  for (let [x1, x2] of Object.entries(paths)) {
    console.log(x1, x2);
    for (let [y1, req] of Object.entries(x2)) {
      let met = methods()[y1];
      if (met === undefined) {
        console.error(`Invalid method: ${met}`);
        continue;
      }
      req.$path = x1;
      req.$method = met;
      req.$params = x2.parameters || [];
      putInCategory(req);
    }
  }

  if (defaultCategory.requests.length === 0) categories.splice(0, 1);

  function putInCategory(req) {
    let tags = magicGetFunc(req, "tags") || [];
    if (tags.length >= 1) {
      let tag = tags[0];
      let cat = findCategory(tag);
      if (cat !== undefined) cat.requests.push(req);
      else categories.push({ name: tag, description: "", requests: [req] });
      return;
    }
    defaultCategory.requests.push(req);
  }

  function findCategory(tag) {
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
    <Dropdown open={true} title={`${category.name} - ${category.description}`}>
      {#each category.requests as req}
        <RequestView {req} />
      {/each}
    </Dropdown>
  {/each}
</div>

<style>
  .req-cat-gap {
    height: 16px;
  }
</style>
