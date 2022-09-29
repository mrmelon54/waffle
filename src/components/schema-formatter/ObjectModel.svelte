<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import SchemaObjectObject from "../../utils/oapi/objects/SchemaObject-Object";
  import Model from "./Model.svelte";
  import SchemaCollapse from "./SchemaCollapse.svelte";
  import SchemaProperty from "./SchemaProperty.svelte";

  export let schema: SchemaObjectObject;
  export let parent;
  export let required;
  export let displayName;

  if (!schema) console.error("[ObjectModel] Schema is invalid:", schema, "[Parent]:", parent);
  console.error("Sparta:", schema.$$raw);
  let description = magicGetFunc(schema, "description");
  let properties = magicGetAllProperties(schema) || {};
  let additionalProperties = magicGetFunc(schema, "additionalProperties") || {};
  let title = (magicGetFunc(schema, "title") || displayName) + (required ? "*" : "");
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
  <SchemaCollapse {title} collapseText={"{...}"} beforeText={"{"} afterText={"}"}>
    <table class="inner-object">
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
          <SchemaProperty key={k} required={isRequired(k)}>
            <Model schema={magicGetSingleProperty(schema, k)} parent={schema} displayName={""} />
          </SchemaProperty>
        {/each}
      {/each}
    </table>
  </SchemaCollapse>
</div>
