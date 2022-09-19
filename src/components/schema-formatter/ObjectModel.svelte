<script>
  import SvelteMarkdown from "svelte-markdown";
  import { magicGetFunc, magicGetAllProperties, magicGetInFunc } from "../../utils/ref-parser";
  import Model from "./Model.svelte";
  import SchemaCollapse from "./SchemaCollapse.svelte";
  import SchemaProperty from "./SchemaProperty.svelte";

  export let name;
  export let schema;
  export let required;
  export let displayName;

  let description = magicGetFunc(schema, "deprecated");
  let properties = magicGetAllProperties(schema) || {};
  let additionalProperties = magicGetFunc(schema, "additionalProperties") || {};
  let title = (magicGetFunc(schema, "title") || displayName || name) + (required ? "*" : "");
  let requiredProperties = magicGetFunc(schema, "required") || [];
  let deprecated = magicGetFunc(schema, "deprecated");
  let externalDocsUrl = magicGetInFunc(schema, ["externalDocs", "url"]);
  let externalDocsDescription = magicGetInFunc(schema, ["externalDocs", "description"]);

  function sortedKeys(props) {
    if (!props) return [];
    let k = Object.keys(props);
    k = Array.from(new Set(k));
    k.sort();
    return k;
  }

  function isRequired(key) {
    return requiredProperties.indexOf(key) != -1;
  }
</script>

<div>
  <SchemaCollapse {title} collapsedText=" " beforeText={"{"} afterText={"}"}>
    <div class="inner-object">
      some object
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
      {#if deprecated}
        <tr class="property">
          <td>deprecated:</td>
          <td>true</td>
        </tr>
      {/if}
      {#each properties as props}
        {#each props as k}
        {console.log(props)}
        {console.log(magicGetInFunc(schema,["properties",props[k]]))}
          <tr class="property">
            <td>{k}{isRequired(k) ? "*" : ""}:</td>
            <td>
              <Model name={""} schema={magicGetInFunc(schema, ["properties", props[k]])} />
            </td>
          </tr>
        {/each}
      {/each}
    </div>
  </SchemaCollapse>
</div>

<style>
  .inner-object {
    display: grid;
    grid-template-columns: auto 100%;
    grid-gap: 4px 16px;
  }
</style>
