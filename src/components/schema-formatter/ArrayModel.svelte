<script>
  import SvelteMarkdown from "svelte-markdown";
  import Model from "./Model.svelte";
  import SchemaCollapse from "./SchemaCollapse.svelte";
  import SchemaProperty from "./SchemaProperty.svelte";

  export let schema;
  let description = schema.get("description");
  let items = schema.get("items");
  let title = schema.get("title") || displayName || name;
  let properties = schema.filter((v, key) => ["type", "items", "description", "$ref", "externalDocs"].indexOf(key) === -1);
  let externalDocsUrl = schema.getIn(["externalDocs", "url"]);
  let externalDocsDescription = schema.getIn(["externalDocs", "description"]);
</script>

<span class="model">
  <SchemaCollapse {title} collapsedContent="[...]">
    {#each Object.entries(properties) as [key, prop]}
      <SchemaProperty key={`${key}-${prop}`} propKey={key} propVal={prop} />
    {/each}
    {#if description}
      <SvelteMarkdown source={description} />
    {/if}
    {#if externalDocsUrl}
      <div class="external-docs">
        <a target="_blank" href={externalDocsUrl}>{externalDocsDescription || externalDocsUrl}</a>
      </div>
    {/if}
    <span>
      <Model name={null} schema={items} required={false} />
    </span>
  </SchemaCollapse>
</span>
