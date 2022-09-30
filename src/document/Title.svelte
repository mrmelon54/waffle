<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import OpenApiObject from "../utils/oapi/objects-old/OpenApiObject";

  export let spec: OpenApiObject;
  let contact = spec.info.contact.getOrDefault(undefined);
  let license = spec.info.license.getOrDefault(undefined);
  let allInfo = [spec.info.termsOfService, spec.info.contact, spec.info.license];
  let infoSize = allInfo.filter((x) => x.isFull()).length;
</script>

<div>
  <div class="main">
    <h2>{spec.info.title}</h2>
  </div>
  {#if spec.info.description.isFull()}
    <div class="description markdown">
      <SvelteMarkdown source={spec.info.description.get()} />
    </div>
  {/if}
  {#if infoSize > 0}
    <div class="info-wrapper">
      {#if spec.info.termsOfService.isFull()}
        <div class="info info__tos">
          <a href={spec.info.termsOfService.get()} target="_blank">Terms of Service</a>
        </div>
      {/if}
      {#if contact}
        <div class="info info__contact">
          {#if contact.url.isFull()}
            <div>
              <a href={contact.url.get()} target="_blank">{contact.name} - Website</a>
            </div>
          {/if}
          {#if contact.email.isFull()}
            <div>
              <a href="mailto:{contact.email.get()}" target="_blank">Send email to {contact.name}</a>
            </div>
          {/if}
        </div>
      {/if}
      {#if license}
        <div class="info info__license">
          {#if license.url.isFull()}
            <a href={license.url.get()} target="_blank">{license.name}</a>
          {/if}
        </div>
      {/if}
      {#if spec.externalDocs.isFull()}
        <div class="info info__extdocs">
          <a href={spec.externalDocs.get().url} target="_blank">{spec.externalDocs.get().description.getOrDefault(spec.externalDocs.get().url)}</a>
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
