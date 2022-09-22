<script>
  import SvelteMarkdown from "svelte-markdown";

  export let param;
</script>

<tr class="param-row">
  <td>
    <div class="param-info-name {param.required ? 'info-required' : ''}">
      {param.name}{#if param.required}<span>&nbsp;*</span>{/if}
    </div>
    <div class="param-info-type">
      <span>{param.schema.type}</span>
      <span>
        {#if param.schema.format}
          (${param.schema.format})
        {/if}
      </span>
    </div>
    {#if param.deprecated}
      <div class="param-info-deprecated">deprecated</div>
    {/if}
    <div class="param-info-in">({param.in})</div>
  </td>
  <td>
    <div class="param-description">
      <SvelteMarkdown source={param.description} />
    </div>
    {#if param.schema.default}
      <p class="param-default">Default value: {param.schema.default}</p>
    {/if}
    {#if param.example}
      <p class="param-example">Example: {param.example}</p>
    {/if}
  </td>
</tr>

<style>
  tr.param-row > td {
    vertical-align: top;
    text-align: left;
  }

  .param-info-name {
    margin-right: 0.76em;
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
