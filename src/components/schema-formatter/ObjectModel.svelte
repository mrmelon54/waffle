<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import SchemaObject from "../../utils/oapi/objects/SchemaObject";
  import SchemaObjectObject from "../../utils/oapi/schemas/SchemaObject-Object";
  import Model from "./Model.svelte";
  import SchemaCollapse from "./SchemaCollapse.svelte";
  import SchemaProperty from "./SchemaProperty.svelte";

  export let schema: SchemaObjectObject;
  export let required: boolean;
  export let displayName: string;

  let title = schema.title.getOrDefault(displayName) + (required ? "*" : "");
  let requiredProperties = schema.requiredProperties.getOrDefault([]);
  let properties = schema.properties.getOrDefault(new Map());
  let propKeys = sortedKeys(properties);

  function sortedKeys(props: Map<string, SchemaObject>) {
    if (!props) return [];
    let k = Array.from(props.entries());
    k.sort((a, b) => a[0].localeCompare(b[0]));
    return k;
  }

  function isRequired(key: string): boolean {
    return requiredProperties.indexOf(key) != -1;
  }
</script>

<div>
  <SchemaCollapse {title} collapseText={"{...}"} beforeText={"{"} afterText={"}"}>
    <table class="inner-object">
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
      {#if schema.deprecated.getOrDefault(false)}
        <tr class="property">
          <td>deprecated:</td>
          <td>true</td>
        </tr>
      {/if}
      {#each propKeys as k}
        <SchemaProperty key={k[0]} required={isRequired(k[0])}>
          <Model schema={k[1]} displayName={""} />
        </SchemaProperty>
      {/each}
    </table>
  </SchemaCollapse>
</div>
