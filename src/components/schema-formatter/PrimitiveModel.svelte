<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import SchemaObjectPrimitive from "../../utils/oapi/schemas/SchemaObject-Primitive";
  import EnumModel from "./EnumModel.svelte";
  import RawProperty from "./RawProperty.svelte";

  export let schema: SchemaObjectPrimitive;
  export let displayName: string;

  let title = schema.title.getOrDefault(displayName);

  let rawProps = [];
  addRawProps("default", "readOnly", "writeOnly", "minLength", "maxLength", "pattern", "example");

  function addRawProps(...keys: string[]) {
    for (let x of keys) {
      let z = schema[x];
      if (z !== undefined) rawProps.push({ key: x, value: z });
    }
  }
</script>

<span class="prop">
  <h5>
    {#if title}
      <span class="prop-title">{title}</span>
    {/if}
    <span class="prop-type">{schema.type}</span>
    {#if schema.format !== undefined && schema.format.isFull()}
      <span class="prop-format">(${schema.format.get()})</span>
    {/if}
  </h5>
  <table>
    {#each rawProps as prop}
      <RawProperty propKey={prop.key} propVal={prop.value} isRequired={false} />
    {/each}
    {#if schema.description.isFull()}
      <tr>
        <td colspan="2" class="schema-description">
          <SvelteMarkdown source={schema.description.get()} />
        </td>
      </tr>
    {/if}
    {#if schema.externalDocs.isFull()}
      <tr>
        <td colspan="2" class="external-docs">
          <a target="_blank" href={schema.externalDocs.get().url}>{schema.externalDocs.get().description.getOrDefault(schema.externalDocs.get().url)}</a>
        </td>
      </tr>
    {/if}
  </table>
  {#if schema.enumValues.isFull()}
    <EnumModel value={schema.enumValues.get()} />
  {/if}
</span>

<style>
  .prop > h5 {
    margin: 0;
  }
</style>
