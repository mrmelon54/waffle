<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import SchemaCollapse from "./SchemaCollapse.svelte";
  import RawProperty from "./RawProperty.svelte";
  import SchemaProperty from "./SchemaProperty.svelte";
  import PrimitiveModel from "./PrimitiveModel.svelte";
  import ModelWrapper from "./ModelWrapper.svelte";
  import { getOrDefault } from "../../utils/oapi/utils/ObjectUtils";
  import { SchemaObjectArray } from "../../utils/oapi/objects/SchemaObject";
  import OpenApiParser from "../../utils/oapi/utils/OpenApiParser";
  import OpenApiFile from "../../utils/oapi/utils/OpenApiFile";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let schema: SchemaObjectArray;
  export let displayName: string;
  export let required: boolean;

  let title = getOrDefault(schema.title, displayName) + (required ? "*" : "");

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
      {#if schema.description !== undefined}
        <tr>
          <td colspan="2" class="schema-description">
            <SvelteMarkdown source={schema.description} />
          </td>
        </tr>
      {/if}
      {#if schema.externalDocs !== undefined}
        <tr>
          <td colspan="2" class="external-docs">
            <a target="_blank" href={schema.externalDocs.url}>{getOrDefault(schema.externalDocs.description, schema.externalDocs.url)}</a>
          </td>
        </tr>
      {/if}
      {#if schema.items !== undefined}
        <SchemaProperty key={"items"} open={true}>
          <ModelWrapper topLevel={false}>
            <PrimitiveModel schema={schema.items} displayName={schema.items.toString()} required={false} />
          </ModelWrapper>
        </SchemaProperty>
      {/if}
    </table>
  </SchemaCollapse>
</span>
