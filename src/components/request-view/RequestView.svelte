<script lang="ts">
  import Markdown from "~/components/markdown/Markdown.svelte";
  import type { OperationObject } from "../../utils/oapi/objects/OperationObject";
  import { allResponses, getFromResponses } from "../../utils/oapi/objects/ResponsesObject";
  import { getOrDefault } from "../../utils/oapi/utils/ObjectUtils";
  import type OpenApiFile from "../../utils/oapi/utils/OpenApiFile";
  import type OpenApiParser from "../../utils/oapi/utils/OpenApiParser";
  import Parameter from "./Parameter.svelte";
  import Response from "./Response.svelte";
  import RequestBody from "./RequestBody.svelte";
  import RequestInfoHeader from "./bubble/RequestInfoHeader.svelte";
  import RequestInfoContent from "./bubble/RequestInfoContent.svelte";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let open = false;
  export let req: OperationObject;

  let deprecated = getOrDefault(req.deprecated, false);

  function handleClick() {
    open = !open;
  }
</script>

<div class="request {open ? 'request-dropdown-open' : 'request-dropdown-closed'} {deprecated ? 'request-deprecated' : ''}" style={req.$$method.style()}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="request-summary" on:click={handleClick}>
    <div class="request-summary-inner">
      <h5>
        <span class="request-summary-method">{req.$$method.name.toUpperCase()}</span>
        <span class="request-summary-path">{req.$$path}</span>
        {#if req.summary !== undefined}
          <span class="request-summary-text">{req.summary}</span>
        {/if}
      </h5>
    </div>
  </div>
  {#if open}
    <div class="request-content">
      {#if deprecated}
        <RequestInfoContent>
          <div class="request-warning">Warning: Deprecated</div>
        </RequestInfoContent>
      {/if}
      {#if req.description !== undefined && req.description !== ""}
        <RequestInfoContent>
          <Markdown source={req.description} />
        </RequestInfoContent>
      {/if}

      <!-- Parameters -->
      <RequestInfoHeader title="Parameters" />
      <RequestInfoContent>
        {#if req.$$params.length > 0}
          <table class="param-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {#each req.$$params as param}
                <Parameter {param} />
              {/each}
              <tr />
            </tbody>
          </table>
        {:else}
          No parameters
        {/if}
      </RequestInfoContent>

      <!-- Request Body -->
      {#if req.requestBody !== undefined}
        <RequestBody {_p} {_f} requestBody={req.requestBody} />
      {/if}

      <!-- Responses -->
      {#if req.responses !== undefined}
        <RequestInfoHeader title="Responses" />
        <RequestInfoContent>
          <div class="table-scroll-wrapper">
            <table class="resp-table">
              <colgroup>
                <col colspan="1" width="auto" />
                <col colspan="1" width="100%" />
              </colgroup>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {#each allResponses(req.responses) as resp}
                  {#await getFromResponses(req.responses, resp)}
                    <span>Loading...</span>
                  {:then x}
                    <Response {_p} {_f} key={resp} resp={x} />
                  {:catch err}
                    <td>{resp}</td>
                    <td>Error: {err}</td>
                  {/await}
                {/each}
              </tbody>
            </table>
          </div>
        </RequestInfoContent>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .request {
    border-radius: 8px;
    border-color: var(--method-high-color);
    border-width: 2px;
    border-style: solid;
    margin: 8px 0;
    background-color: var(--method-bg-color);

    > .request-content {
      border-radius: 0 0 8px 8px;
    }

    > .request-summary {
      > .request-summary-inner {
        padding: 4px;
        cursor: pointer;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          background: transparent url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="%23c7c2bb" d="M13.418 7.859a.695.695 0 0 1 .978 0 .68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969.695.695 0 0 1 .978 0L10 11l3.418-3.141z"/></svg>') right 10px center no-repeat;
          background-size: 40px;
          width: 60px;
          height: 100%;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          transition: ease-in-out transform 500ms;
        }

        > h5 {
          margin: 0;
          padding-right: 50px;

          > .request-summary-method {
            background: var(--method-color);
            border-radius: 4px;
            min-width: 80px;
            min-height: 30px;
            line-height: 30px;
            display: inline-block;
            text-align: center;
            font-family: sans-serif;
            font-size: 14px;
            font-weight: 700;
          }

          > .request-summary-path {
            font-size: 16px;
            color: #eaeaea;
            display: inline-block;
            width: fit-content;
            padding: 5px 6px;
          }

          > .request-summary-text {
            font-size: 13px;
            color: #959595;
            display: inline-block;
            width: fit-content;
            padding: 6px 6px;
          }
        }
      }
    }

    &.request-dropdown-open > .request-summary {
      border-bottom: solid 2px var(--method-high-color);

      > .request-summary-inner::after {
        transform: translateY(-50%) rotate(180deg);
      }
    }

    &.request-deprecated {
      --method-color: #373c41 !important;
      --method-high-color: #363a3c !important;
      //--method-bg-color: #8a89891a !important;
      color: #bcb6ad;

      > .request-summary > .request-summary-inner > h5 {
        > .request-summary-path {
          text-decoration: line-through;
          text-decoration-color: currentColor;
          color: #bcb6ad;
        }

        > .request-summary-text {
          color: #a19c93;
        }
      }
    }
  }

  .request-warning {
    font-size: 120%;
    color: #e64b4b;
    text-align: center;
  }

  .table-scroll-wrapper {
    width: 100%;
    overflow-x: auto;
  }

  table.param-table > tr > th {
    vertical-align: top;
    text-align: left;
    padding-left: 0.76em;

    &:first-child {
      padding-left: 0;
    }
  }

  table.resp-table {
    border-collapse: collapse;
    width: 100%;

    > tr > th {
      vertical-align: top;
      text-align: left;
      padding-left: 0.76em;

      &:first-child {
        padding-left: 0;
      }
    }
  }
</style>
