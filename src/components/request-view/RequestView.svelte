<script>
  import SvelteMarkdown from "svelte-markdown";
  import Parameter from "./Parameter.svelte";
  export let open = false;
  export let req;

  function handleClick() {
    open = !open;
  }
</script>

<div class="request {open ? 'request-dropdown-open' : 'request-dropdown-closed'} {req.deprecated ? 'request-deprecated' : ''}" style="--method-color:{req.$method.color};--method-high-color:{req.$method.highColor};--method-bg-color:{req.$method.bgColor};">
  <div class="request-summary" on:click={handleClick}>
    <div class="request-summary-inner">
      <h5>
        <span class="request-summary-method">{req.$method.method.toUpperCase()}</span>
        <span class="request-summary-path">{req.$path}</span>
        <span class="request-summary-text">{req.summary}</span>
      </h5>
    </div>
  </div>
  {#if open}
    <div class="request-content">
      {#if req.description}
        <div class="request-description">
          <SvelteMarkdown source={req.description} />
        </div>
      {/if}
      <div class="request-header">
        <span class="request-header-tab">Parameters</span>
      </div>
      <div class="request-description">
        {#if req.$params.length > 0}
          <table class="param-table">
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
            {#each req.$params as param}
              <Parameter {param} />
            {/each}
            <tr />
          </table>
        {:else}
          No parameters
        {/if}
      </div>
      {#if req.requestBody}
        <div class="request-header">
          <span class="request-header-tab info-required">Request Body</span>
        </div>
        <div class="request-description">Work In Progress</div>
      {/if}
      {#if req.responses}
        <div class="request-header">
          <span class="request-header-tab">Responses</span>
        </div>
        <div class="request-description">Work In Progress</div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .request {
    border-radius: 8px;
    border-color: var(--method-high-color);
    border-width: 2px;
    border-style: solid;
    margin: 8px 0;
    background-color: var(--method-bg-color);
  }

  .request > .request-summary {
    position: relative;
  }

  .request > .request-summary > .request-summary-inner {
    margin: 4px;
  }

  .request > .request-content {
    border-radius: 0 0 8px 8px;
  }

  .request.request-dropdown-open > .request-summary {
    border-bottom: solid 2px var(--method-high-color);
  }

  .request > .request-summary::after {
    content: "";
    position: absolute;
    background: transparent url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="%23c7c2bb" d="M13.418 7.859a.695.695 0 0 1 .978 0 .68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969.695.695 0 0 1 .978 0L10 11l3.418-3.141z"/></svg>') right 10px center no-repeat;
    background-size: 40px;
    width: 60px;
    height: 60px;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    transition: ease-in-out transform 500ms;
  }

  .request.request-dropdown-open > .request-summary::after {
    transform: translateY(-50%) rotate(180deg);
  }

  .request > .request-summary > .request-summary-inner > h5 {
    margin: 0;
  }

  .request > .request-summary > .request-summary-inner > h5 > .request-summary-method {
    background: var(--method-color);
    border-radius: 4px;
    min-width: 80px;
    padding: 6px 0;
    display: inline-block;
    text-align: center;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 700;
  }

  .request > .request-summary > .request-summary-inner > h5 > .request-summary-path {
    font-size: 16px;
    color: #eaeaea;
  }

  .request > .request-summary > .request-summary-inner > h5 > .request-summary-text {
    font-size: 13px;
    color: #959595;
  }

  .request > .request-content > .request-description {
    padding: 15px 20px;
  }

  .request > .request-content > .request-header {
    padding: 15px 20px;
    background-color: #252832;
  }

  .request > .request-content > .request-header > .request-header-tab {
    position: relative;
  }

  .request > .request-content > .request-header > .request-header-tab::after {
    content: " ";
    background-color: var(--method-high-color);
    display: block;
    width: 120%;
    height: 4px;
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
  }

  .request.request-deprecated {
    --method-color: #232628 !important;
    --method-high-color: #363a3c !important;
    --method-bg-color: #565a5c1a !important;
    color: #bcb6ad;
  }

  .request.request-deprecated > .request-summary > .request-summary-inner > h5 > .request-summary-path {
    text-decoration: line-through;
    text-decoration-color: currentColor;
    color: #bcb6ad;
  }

  .request.request-deprecated > .request-summary > .request-summary-inner > h5 > .request-summary-text {
    color: #a19c93;
  }

  table.param-table > tr > th {
    vertical-align: top;
    text-align: left;
  }
</style>
