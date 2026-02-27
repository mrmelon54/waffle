<script lang="ts">
  import Markdown from "~/components/markdown/Markdown.svelte";
  import type { SchemaObjectPrimitive } from "../../utils/oapi/objects/SchemaObject";
  import type Ctx from "../../utils/oapi/utils/Ctx";
  import { getOrDefault } from "../../utils/oapi/utils/ObjectUtils";
  import type OpenApiFile from "../../utils/oapi/utils/OpenApiFile";
  import type OpenApiParser from "../../utils/oapi/utils/OpenApiParser";
  import Ref from "../../utils/oapi/utils/Ref";
  import EnumModel from "./EnumModel.svelte";
  import RawProperty from "./RawProperty.svelte";

  interface Props {
    _p: OpenApiParser;
    _f: OpenApiFile;
    schema: SchemaObjectPrimitive;
    displayName: string;
  }

  let {
    _p,
    _f,
    schema,
    displayName
  }: Props = $props();

  let rawProps = [];
  addRawProps("default", "readOnly", "writeOnly", "minLength", "maxLength", "pattern", "example");

  async function getFinal(): Promise<{ v: Ctx<SchemaObjectPrimitive>; title: string }> {
    let v = await Ref.getValueOrRef(_p, _f, schema, async (x) => <SchemaObjectPrimitive>x);
    let title = getOrDefault(v.v.title, displayName);
    return { v, title };
  }

  function addRawProps(...keys: string[]) {
    for (let x of keys) {
      let z = x[x];
      if (z !== undefined) rawProps.push({ key: x, value: z });
    }
  }
</script>

<span class="prop">
  {#await getFinal()}
    <div>Loading...</div>
  {:then x}
    <h5>
      {#if x.title !== undefined}
        <span class="prop-title">{x.title}</span>
      {/if}
      <span class="prop-type">{x.v.v.type}</span>
      {#if x.v.v.format !== undefined}
        <span class="prop-format">(${x.v.v.format})</span>
      {/if}
    </h5>
    <table>
      {#each rawProps as prop}
        <RawProperty propKey={prop.key} propVal={prop.value} isRequired={false} />
      {/each}
      {#if x.v.v.description !== undefined}
        <tr>
          <td colspan="2" class="schema-description">
            <Markdown source={x.v.v.description} />
          </td>
        </tr>
      {/if}
      {#if x.v.v.externalDocs !== undefined}
        <tr>
          <td colspan="2" class="external-docs">
            <a target="_blank" href={x.v.v.externalDocs.url}>{getOrDefault(x.v.v.externalDocs.description, x.v.v.externalDocs.url)}</a>
          </td>
        </tr>
      {/if}
    </table>
    {#if x.v.v.enumValues !== undefined}
      <EnumModel value={x.v.v.enumValues} />
    {/if}
  {/await}
</span>

<style>
  .prop > h5 {
    margin: 0;
  }
</style>
