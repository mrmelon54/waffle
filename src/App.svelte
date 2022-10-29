<script>
  import { onMount } from "svelte";
  import Definition from "./Definition.svelte";
  import Selector from "./components/Selector.svelte";

  async function fetchConfig() {
    // @ts-ignore
    const resp = await fetch(window.CONFIG_URL ?? "config.json");
    return await resp.json();
  }

  onMount(async () => {
    const config = await fetchConfig();
    name = config.name;
    specUrls = config.specs;
    for (const item of Object.values(specUrls)) {
      if (item.name == config.primary) {
        specUrl = item.url;
        break;
      }
    }
  });

  let specUrls = [];
  let specUrl = "";
  let name;

  // @ts-ignore
  let poweredName = `Waffle${BUILD_REF ? ` ${BUILD_REF}` : ""}`;
  // @ts-ignore
  let poweredUrl = `https://github.com/MrMelon54/waffle${BUILD_REF ? `/releases/tag/${BUILD_REF}` : ""}`;
</script>

<div id="app">
  <header>
    <h1>Waffle - {name}</h1>
    <div>
      <span>Select a definition</span>
      <Selector bind:value={specUrl}>
        {#each specUrls as spec}
          <option value={spec.url}>{spec.name}</option>
        {/each}
      </Selector>
    </div>
  </header>
  {#if specUrl === "" || specUrl === undefined}
    <div>No OpenAPI spec selected</div>
  {:else}
    <Definition spec={new URL(specUrl, window.location.href)} />
  {/if}
  <footer>
    Powered by <a href={poweredUrl} target="_blank">{poweredName}</a>
  </footer>
</div>

<style lang="scss">
  #app {
    max-width: 1000px;
    margin: auto;

    > header {
      padding: 0 60px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
      min-height: 80px;
      max-height: 80px;
      background-color: #252832;
      border-radius: 0 0 16px 16px;
    }

    > footer {
      padding: 16px;
    }
  }
</style>
