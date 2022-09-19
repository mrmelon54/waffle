<script>
  import SchemaFormatter from "./SchemaFormatter.svelte";

  export let value;
  console.log(value);
</script>

<div>
  {#if value.type}
    <div>{value.type}</div>
  {/if}
  {#if value.readOnly}
    <div>readOnly: {value.readOnly}</div>
  {/if}
  {#if value.default}
    <div>default: {value.default}</div>
  {/if}
  {#if value.example}
    <div>example: {value.example}</div>
  {/if}
  {#if value.description}
    <div>Description: {value.description}</div>
  {/if}
  <SchemaFormatter name="" schema={value} />
</div>
