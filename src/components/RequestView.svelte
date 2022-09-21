<script>
  import SvelteMarkdown from "svelte-markdown";
  import methods from "../utils/methods";

  export let open = false;
  export let req;

  function handleClick() {
    open = !open;
  }
</script>

<div class="request {open ? 'request-dropdown-open' : 'request-dropdown-closed'}" style="--method-color:{req.$method.color};--method-high-color:{req.$method.highColor};--method-bg-color:{req.$method.bgColor};">
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
</style>
