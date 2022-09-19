<script>
  import SvelteMarkdown from "svelte-markdown";
  import { magicGetFunc } from "../../utils/ref-parser";
  import EnumModel from "./EnumModel.svelte";
  import SchemaCollapse from "./SchemaCollapse.svelte";
  import SchemaProperty from "./SchemaProperty.svelte";

  export let schema;
  export let displayName;
  export let name;

  let type = magicGetFunc(schema, "type");
  let format = magicGetFunc(schema, "format");
  let xml = magicGetFunc(schema, "xml");
  let enumArray = magicGetFunc(schema, "enum");
  let title = magicGetFunc(schema, "title") || displayName || name;
  let description = magicGetFunc(schema, "description");
  let properties = Object.keys(schema).filter((_, key) => ["enum", "type", "format", "description", "$ref", "externalDocs"].indexOf(key) === -1);
  let externalDocsUrl = magicGetFunc(schema, ["externalDocs", "url"]);
  let externalDocsDescription = magicGetFunc(schema, ["externalDocs", "description"]);
</script>

<span class="model">
  <SchemaCollapse {title} collapsedText=" " beforeText="" afterText="">
    <span class="prop">
      <span class="prop-type">{type}</span>
      {#if format}
        <span class="prop-format">(${format})</span>
      {/if}
      {#each Object.entries(properties) as [k, v]}
        <SchemaProperty key={`${k}-${v}`} propKey={k} propVal={v} />
      {/each}
      {#if description}
        <SvelteMarkdown source={description} />
      {/if}
      {#if externalDocsUrl}
        <div class="external-docs">
          <a target="_blank" href={externalDocsUrl}>{externalDocsDescription || externalDocsUrl}</a>
        </div>
      {/if}
      {#if xml && xml.length}
        <span>xml:</span>
        {#each Object.entries(xml) as [key, v]}
          <span key={`${key}-${v}`}>
            {key}: {String(v)}
          </span>
        {/each}
      {/if}
      {#if enumArray}
        <EnumModel value={enumArray} />
      {/if}
    </span>
  </SchemaCollapse>
</span>
