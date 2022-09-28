<script>
  import SvelteMarkdown from "svelte-markdown";
  import Model from "./Model.svelte";
  import SchemaCollapse from "./SchemaCollapse.svelte";
  import RawProperty from "./RawProperty.svelte";
  import SchemaProperty from "./SchemaProperty.svelte";

  export let schema;
  export let displayName;
  export let required;

  let description = magicGetFunc(schema, "description");
  let properties = magicGetAllProperties(schema) || {};
  let items = magicGetFunc(schema, "items");
  let title = (magicGetFunc(schema, "title") || displayName) + (required ? "*" : "");
  // ["type", "items", "description", "$ref", "externalDocs"].indexOf(key) === -1
  let deprecated = magicGetFunc(schema, "deprecated");
  let externalDocsUrl = magicGetInFunc(schema, ["externalDocs", "url"]);
  let externalDocsDescription = magicGetInFunc(schema, ["externalDocs", "description"]);

  let rawProps = [];
  addRawProps("readOnly", "writeOnly", "minItems", "maxItems", "minLength", "maxLength");
  addJsonProps("xml", "additionalItems");

  function addRawProps(...keys) {
    for (let x of keys) {
      let z = magicGetFunc(schema, x);
      if (z !== undefined) rawProps.push({ key: x, value: String(z) });
    }
  }

  function addJsonProps(...keys) {
    for (let x of keys) {
      let z = magicGetFunc(schema, x);
      if (z !== undefined) rawProps.push({ key: x, value: JSON.stringify(z) });
    }
  }
</script>

<span class="model">
  <SchemaCollapse {title} collapseText="[...]">
    <table class="inner-table">
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
        <div class="external-docs">
          <a target="_blank" href={externalDocsUrl}>{externalDocsDescription || externalDocsUrl}</a>
        </div>
      {/if}
      <SchemaProperty key={"items"} open={true}>
        <Model displayName={magicGetFunc(items, "$name")} schema={items} required={false} />
      </SchemaProperty>
    </table>
  </SchemaCollapse>
</span>
