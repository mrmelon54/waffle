<script>
  import SvelteMarkdown from "svelte-markdown";

  export let spec;
</script>

<div>
  <div class="main">
    <h2>{spec.info.title}</h2>
  </div>
  {#if spec.info.description}
    <div class="description markdown">
      <SvelteMarkdown source={spec.info.description} />
    </div>
  {/if}
  <div class="info-wrapper">
    {#if spec.info.termsOfService}
      <div class="info info__tos">
        <a href={spec.info.termsOfService} target="_blank">Terms of Service</a>
      </div>
    {/if}
    {#if spec.info.contact}
      <div class="info info__contact">
        {#if spec.info.contact.url}
          <div>
            <a href={spec.info.contact.url} target="_blank">{spec.info.contact.name} - Website</a>
          </div>
        {/if}
        {#if spec.info.contact.email}
          <div>
            <a href="mailto:{spec.info.contact.email}" target="_blank">Send email to {spec.info.contact.name}</a>
          </div>
        {/if}
      </div>
    {/if}
    {#if spec.info.license}
      <div class="info info__license">
        <a href={spec.info.license.url} target="_blank">{spec.info.license.name}</a>
      </div>
    {/if}
    {#if spec.externalDocs}
      <div class="info info__extdocs">
        <a href={spec.externalDocs.url} target="_blank">{spec.externalDocs.description}</a>
      </div>
    {/if}
  </div>
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
