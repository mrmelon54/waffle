<script>
  import InnerSchema from "./InnerSchema.svelte";

  export let name;
  export let schema;
  let open;

  const brackets = {
    before: { array: "[", object: "{", undefined: "{" },
    after: { array: "]", object: "}", undefined: "}" },
  };

  function handleClick() {
    open = !open;
  }
</script>

<div class="schema-view {open ? 'schema-open' : 'schema-closed'}" bracket-after={brackets.after[schema.type]}>
  <h5 bracket-before={brackets.before[schema.type]} on:click={handleClick}>{name}</h5>
  {#if open}
    <div class="schema-content">
      <InnerSchema {schema} />
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
    padding: 0 30px 0 0;
    margin: 0;
    cursor: pointer;
    height: 20px;
  }

  .schema-view.schema-open > h5 {
    padding: 0 60px 0 0;
  }

  .schema-view > h5::before {
    content: "";
    position: absolute;
    background: transparent url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="%23c7c2bb" d="M13.418 7.859a.695.695 0 0 1 .978 0 .68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969.695.695 0 0 1 .978 0L10 11l3.418-3.141z"/></svg>') right 10px center no-repeat;
    background-size: 40px;
    background-position: center;
    width: 20px;
    height: 20px;
    top: 50%;
    right: 0;
    transform: translateY(-50%) rotate(-90deg);
    transition: ease-in-out transform 250ms;
  }

  .schema-view.schema-open > h5::before {
    right: 30px;
    transform: translateY(-50%);
  }

  .schema-view.schema-open > h5::after {
    content: attr(bracket-before);
    position: absolute;
    right: 12px;
  }

  .schema-view.schema-open::after {
    content: attr(bracket-after);
    position: absolute;
  }

  .schema-view > .schema-content {
    padding: 8px 16px;
  }
</style>
