<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import { OpenApiObject } from "../utils/oapi/objects/OpenApiObject";
  import { getOrDefault } from "../utils/oapi/utils/ObjectUtils";

  export let spec: OpenApiObject;
  let contact = spec.info.contact;
  let license = spec.info.license;
  let allInfo = [spec.info.termsOfService, spec.info.contact, spec.info.license];
  let infoSize = allInfo.filter((x) => x !== undefined).length;
</script>

<div>
  <div class="main">
    <h2>{spec.info.title}</h2>
  </div>
  {#if spec.info.description !== undefined}
    <div class="description markdown">
      <SvelteMarkdown source={spec.info.description} />
    </div>
  {/if}
  {#if infoSize > 0}
    <div class="info-wrapper">
      {#if spec.info.termsOfService !== undefined}
        <div class="info info__tos">
          <a href={spec.info.termsOfService} target="_blank">Terms of Service</a>
        </div>
      {/if}
      {#if contact}
        <div class="info info__contact">
          {#if contact.url !== undefined}
            <div>
              <a href={contact.url} target="_blank">{contact.name} - Website</a>
            </div>
          {/if}
          {#if contact.email !== undefined}
            <div>
              <a href="mailto:{contact.email}" target="_blank">Send email to {contact.name}</a>
            </div>
          {/if}
        </div>
      {/if}
      {#if license}
        <div class="info info__license">
          {#if license.url !== undefined}
            <a href={license.url} target="_blank">{license.name}</a>
          {/if}
        </div>
      {/if}
      {#if spec.externalDocs !== undefined}
        <div class="info info__extdocs">
          <a href={spec.externalDocs.url} target="_blank">{getOrDefault(spec.externalDocs.description, spec.externalDocs.url)}</a>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .main {
    padding: 16px 30px;
    font-size: 30px;
  }
  .main h2 {
    margin: 0;
  }
  .description {
    background: #252832;
    padding: 8px 16px;
    border-radius: 16px;
  }
  .info-wrapper {
    padding: 16px;
    border-radius: 16px;
    display: inline-block;
  }
  .info-wrapper .info {
    padding: 8px;
  }
</style>
