<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import {ParameterObject} from "../../utils/oapi/objects/ParameterObject";

  export let param: ParameterObject;
  //let schema = param.schema.getOrDefault({ $$raw: {}, $ref: StaticOptional.full("") }).$$raw;
</script>

<tr class="param-row">
  <td>
    <p />
    <div class="param-info-name {param.required ? 'info-required' : ''}">
      {param.name}{#if param.required}<span>&nbsp;*</span>{/if}
    </div>
    <!-- {#if param.schema.isFull()}
      <div class="param-info-type">
        <span>{schema.type}</span>
        {#if schema.format}
          <span>(${schema.format})</span>
        {/if}
      </div>
    {/if}
    {#if param.deprecated.getOrDefault(false)}
      <div class="param-info-deprecated">deprecated</div>
    {/if} -->
    <div class="param-info-in">({param.in})</div>
  </td>
  <td>
    <!-- {#if param.description.isFull()}
      <div class="param-description">
        <SvelteMarkdown source={param.description.get()} />
      </div>
    {/if}
    {#if schema.default}
      <p class="param-default">Default value: {schema.default}</p>
    {/if}
    {#if param.example.isFull()}
      <p class="param-example">Example: {param.example.get()}</p>
    {/if} -->
  </td>
</tr>

<style>
  tr.param-row > td {
    vertical-align: top;
    text-align: left;
    padding-left: 0.76em;
  }

  tr.param-row > td:first-child {
    padding-left: 0;
  }

  .info-required > span {
    color: #ff1a1a;
  }

  .info-required::after {
    content: "required";
    color: #ff1a1a99;
    font-size: 10px;
    padding: 5px;
    position: relative;
    top: -6px;
    font-weight: 700;
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
