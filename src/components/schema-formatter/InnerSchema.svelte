<script>
  import InnerValue from "./InnerValue.svelte";

  export let schema;

  function sortedKeys(...props) {
    if (!props) return [];
    let k = [];
    for (let a of props) {
      k.push(...Object.keys(props));
    }
    k = Array.from(new Set(k));
    k.sort();
    return k;
  }

  function isRequired(key) {
    if (!schema.required) return false;
    return schema.required.indexOf(key) != -1;
  }
</script>

{#if schema.description}
  <div class="schema-description">{schema.description}</div>
{/if}
<div>
  {#if schema.properties}
    <div class="schema-inner">
      {#each sortedKeys(schema.properties, schema.$ref.properties) as key}
        <div class="schema-inner-key">{key}{isRequired(key) ? "*" : ""}</div>
        <div class="schema-inner-value">
          <InnerValue value={schema.properties[key]} />
        </div>
      {/each}
    </div>
  {:else if schema.allOf}
    <div>All of:</div>
    {#each schema.allOf as inner}
      <div class="schema-content">
        <svelte:self schema={inner} />
      </div>
    {/each}
  {:else if schema.anyOf}
    <div>Any of:</div>
    {#each schema.allOf as inner}
      <div class="schema-content">
        <svelte:self schema={inner} />
      </div>
    {/each}
  {/if}
</div>

<style>
  .schema-inner {
    display: grid;
    grid-template-columns: auto 100%;
    grid-gap: 4px 16px;
  }
</style>
