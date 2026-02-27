<script lang="ts">
  import Markdown from "~/components/markdown/Markdown.svelte";
  import SchemaCollapse from "./SchemaCollapse.svelte";
  import RawProperty from "./RawProperty.svelte";
  import SchemaProperty from "./SchemaProperty.svelte";
  import { getOrDefault } from "../../utils/oapi/utils/ObjectUtils";
  import type { SchemaObjectArray } from "../../utils/oapi/objects/SchemaObject";
  import type OpenApiParser from "../../utils/oapi/utils/OpenApiParser";
  import type OpenApiFile from "../../utils/oapi/utils/OpenApiFile";
  import Model from "./Model.svelte";

  interface Props {
    _p: OpenApiParser;
    _f: OpenApiFile;
    schema: SchemaObjectArray;
    displayName: string;
    required: boolean;
    open?: boolean;
  }

  let {
    _p,
    _f,
    schema,
    displayName,
    required,
    open = false
  }: Props = $props();

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
  <SchemaCollapse {title} collapseText="[...]" beforeText="[" afterText="]" {open}>
    <table class="inner-table">
      {#each rawProps as prop}
        <RawProperty propKey={prop.key} propVal={prop.value} isRequired={false} />
      {/each}
      {#if schema.description !== undefined}
        <tr>
          <td colspan="2" class="schema-description">
            <Markdown source={schema.description} />
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
        <SchemaProperty key={"items"} {required}>
          <Model {_p} {_f} schema={schema.items} displayName={undefined} />
        </SchemaProperty>
      {/if}
    </table>
  </SchemaCollapse>
</span>
