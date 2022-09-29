<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import SchemaCollapse from "./SchemaCollapse.svelte";
  import RawProperty from "./RawProperty.svelte";
  import SchemaProperty from "./SchemaProperty.svelte";
  import SchemaObjectArray from "../../utils/oapi/schemas/SchemaObject-Array";
  import PrimitiveModel from "./PrimitiveModel.svelte";
  import ModelWrapper from "./ModelWrapper.svelte";
  import { get } from "svelte/store";

  export let schema: SchemaObjectArray;
  export let displayName: string;
  export let required: boolean;

  let title = schema.title.getOrDefault(displayName) + (required ? "*" : "");

  let rawProps = [];
  addRawProps("readOnly", "writeOnly", "minItems", "maxItems", "minLength", "maxLength");
  addJsonProps("xml", "additionalItems");

  function addRawProps(...keys: string[]) {
    for (let x of keys) {
      let z = schema[x];
      if (z !== undefined) rawProps.push({ key: x, value: String(z) });
    }
  }

  function addJsonProps(...keys: string[]) {
    for (let x of keys) {
      let z = schema[x];
      if (z !== undefined) rawProps.push({ key: x, value: JSON.stringify(z) });
    }
  }
</script>

<span class="model">
  <SchemaCollapse {title} collapseText="[...]" beforeText="" afterText="">
    <table class="inner-table">
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
      {#if schema.items.isFull()}
        <SchemaProperty key={"items"} open={true}>
          <ModelWrapper topLevel={false}>
            <PrimitiveModel schema={schema.items.get()} displayName={schema.items.get().toString()} required={false} />
          </ModelWrapper>
        </SchemaProperty>
      {/if}
    </table>
  </SchemaCollapse>
</span>
