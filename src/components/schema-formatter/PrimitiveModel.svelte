<script>
  import SvelteMarkdown from "svelte-markdown";
  import { magicGetFunc, magicGetInFunc } from "../../utils/ref-parser";
  import EnumModel from "./EnumModel.svelte";
  import RawProperty from "./RawProperty.svelte";

  export let schema;
  export let displayName;

  let type = magicGetFunc(schema, "type");
  let format = magicGetFunc(schema, "format");
  let xml = magicGetFunc(schema, "xml");
  let enumArray = magicGetFunc(schema, "enum");
  let title = magicGetFunc(schema, "title") || displayName;
  let description = magicGetFunc(schema, "description");
  let externalDocsUrl = magicGetInFunc(schema, ["externalDocs", "url"]);
  let externalDocsDescription = magicGetInFunc(schema, ["externalDocs", "description"]);

  let rawProps = [];
  addRawProps("default", "readOnly", "writeOnly", "minLength", "maxLength", "pattern", "example");

  function addRawProps(...keys) {
    for (let x of keys) {
      let z = magicGetFunc(schema, x);
      if (z !== undefined) rawProps.push({ key: x, value: z });
    }
  }
</script>

<span class="prop">
  <h5>
    {#if title}
      <span class="prop-title">{title}</span>
    {/if}
    <span class="prop-type">{type}</span>
    {#if format}
      <span class="prop-format">(${format})</span>
    {/if}
  </h5>
  <table>
    {#each rawProps as prop}
      <RawProperty propKey={prop.key} propVal={prop.value} />
    {/each}
    {#if description}
      <tr>
        <td colspan="2" class="schema-description">
          <SvelteMarkdown source={description} />
        </td>
      </tr>
    {/if}
    {#if externalDocsUrl}
      <tr>
        <td colspan="2" class="external-docs">
          <a target="_blank" href={externalDocsUrl}>{externalDocsDescription || externalDocsUrl}</a>
        </td>
      </tr>
    {/if}
  </table>
  {#if enumArray}
    <EnumModel value={enumArray} />
  {/if}
</span>

<style>
  .prop > h5 {
    margin: 0;
  }
</style>
