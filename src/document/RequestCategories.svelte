<script>
  import Dropdown from "../components/Dropdown.svelte";
  import methods from "../utils/methods";
  import { magicGetFunc } from "../utils/ref-parser";

  export let tags;
  export let paths;
  export let components;

  let categories = [...tags.map((x) => ({ ...x, requests: [] }))];
  for (let [x1, x2] of Object.entries(paths)) {
    console.log(x1, x2);
    for (let met of methods()) {
      let req = magicGetFunc(x2, met.method);
      if (req === undefined) continue;
      req.$path = x1;
      req.$method = met;
      putInCategory(req);
    }
  }

  function putInCategory(req) {
    let tags = magicGetFunc(req, "tags") || [];
    if (tags.length >= 1) {
      let tag = tags[0];
      for (let x of categories) {
        if (x.name == tag) {
          x.requests.push(req);
          break;
        }
      }
    }
  }
</script>

<div class="request-categories">
  {#each categories as category, i}
    {#if i != 0}
      <div class="req-cat-gap" />
    {/if}
    <Dropdown open={true} title={`${category.name} - ${category.description}`}>
      {#each category.requests as req}
        <div>Request: {req.$method} - {req.$path}</div>
      {/each}
    </Dropdown>
  {/each}
</div>

<style>
  .req-cat-gap {
    height: 16px;
  }
</style>
