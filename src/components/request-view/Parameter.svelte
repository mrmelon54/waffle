<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import type { ParameterObject } from "../../utils/oapi/objects/ParameterObject";
  import type { SchemaObjectPrimitive } from "../../utils/oapi/objects/SchemaObject";
  import { getOrDefault } from "../../utils/oapi/utils/ObjectUtils";

  export let param: ParameterObject;

  let schema = <SchemaObjectPrimitive>param.schema;
</script>

<tr class="param-row">
  <td>
    <p />
    <div class="param-info-name {param.required ? 'info-required' : ''}">
      {param.name}{#if param.required}<span>&nbsp;*</span>{/if}
    </div>
    {#if param.schema !== undefined}
      <div class="param-info-type">
        <span>{schema.type}</span>
        {#if schema.format !== undefined}
          <span>(${schema.format})</span>
        {/if}
      </div>
    {/if}
    {#if getOrDefault(param.deprecated, false)}
      <div class="param-info-deprecated">deprecated</div>
    {/if}
    <div class="param-info-in">({param.in})</div>
  </td>
  <td>
    {#if param.description !== undefined}
      <div class="param-description">
        <SvelteMarkdown source={param.description} />
      </div>
    {/if}
    {#if param.schema !== undefined}
      {#if param.schema.default !== undefined}
        <p class="param-default">Default value: {param.schema.default}</p>
      {/if}
    {/if}
    {#if param.example !== undefined}
      <p class="param-example">Example: {param.example}</p>
    {/if}
  </td>
</tr>

<style lang="scss">
  tr.param-row > td {
    vertical-align: top;
    text-align: left;
    padding-left: 0.76em;

    &:first-child {
      padding-left: 0;
    }
  }

  .info-required {
    &::after {
      content: "required";
      color: #ff1a1a99;
      font-size: 10px;
      padding: 5px;
      position: relative;
      top: -6px;
      font-weight: 700;
    }

    > span {
      color: #ff1a1a;
    }
  }

  .param-info-type {
    font-size: 13px;
  }

  .param-info-deprecated {
    font-size: 12px;
    color: #ff1a1a;
    font-style: italic;
    font-weight: 700;
  }

  .param-info-in {
    font-size: 12px;
    color: #988f81;
    font-family: monospace;
    font-style: italic;
    font-weight: 600;
  }
</style>
