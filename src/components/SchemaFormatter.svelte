<script>
  export let name;
  export let schema;
  let open;

  const brackets = {
    before: { array: "[", object: "{" },
    after: { array: "]", object: "}" },
  };

  function handleClick() {
    open = !open;
  }

  function findType(schema) {
    if (Array.isArray(schema)) return "array";
    return typeof schema;
  }

  function formatSchemaInnerValue(value) {
    if (!value) return `Error: Value missing ${JSON.stringify(value)}`;
    if (value.error) return `Error: ${value.error}`;
    return value.type + (value.format ? `(${value.format})` : "");
  }
</script>

<div class="schema-view {open ? 'schema-open' : 'schema-closed'}" on:click={handleClick} bracket-after={brackets.after[schema.type]}>
  <h5 bracket-before={brackets.before[schema.type]}>{name}</h5>
  {#if open}
    <div class="schema-content">
      {#if schema.description}
        <div class="schema-description">{schema.description}</div>
      {/if}
      <div class="schema-inner">
        {#if schema.data.error}
          <div class="schema-inner-error">Error: {schema.data.error}</div>
        {:else}
          {#each schema.data as data}
            <div class="schema-inner-key">{data[0]}</div>
            <div class="schema-inner-value">{formatSchemaInnerValue(data)}</div>
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .schema-view {
    position: relative;
    padding-left: 16px;
    margin-top: 16px;
  }

  .schema-view.schema-open {
    margin-bottom: 32px;
  }

  .schema-view > h5 {
    display: inline-block;
    position: relative;
    padding: 0;
    margin: 0;
  }

  .schema-view > h5::before {
    content: "";
    position: absolute;
    background: transparent url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="%23c7c2bb" d="M13.418 7.859a.695.695 0 0 1 .978 0 .68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969.695.695 0 0 1 .978 0L10 11l3.418-3.141z"/></svg>') right 10px center no-repeat;
    background-size: 40px;
    width: 60px;
    height: 60px;
    top: 50%;
    right: -50px;
    transform: translateY(-50%) rotate(-90deg);
    transition: ease-in-out transform 250ms;
  }

  .schema-view.schema-open > h5::before {
    transform: translateY(-50%);
  }

  .schema-view.schema-open > h5::after {
    content: attr(bracket-before);
    position: absolute;
    right: -48px;
  }

  .schema-view.schema-open::after {
    content: attr(bracket-after);
    position: absolute;
  }

  .schema-view > .schema-content {
    padding: 8px 16px;
  }

  .schema-view > .schema-content > .schema-inner {
    display: grid;
    grid-template-columns: auto 100%;
    grid-gap: 4px 16px;
  }
</style>
