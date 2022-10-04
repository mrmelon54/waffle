<script>
  import {onMount} from "svelte";
  import Definition from "./Definition.svelte";
  import Selector from "./components/Selector.svelte";
  import "svelte-highlight/styles/github.css";

  async function fetchConfig() {
    const resp = await fetch(window.CONFIG_URL || "config.json");
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
    <Definition spec={new URL(specUrl, location)} />
  {/if}
  <footer>
    Powered by <a href="https://github.com/MrMelon54/waffle" target="_blank">Waffle</a>
  </footer>
</div>

<style>
  #app {
    max-width: 1000px;
    margin: auto;
  }

  header {
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

  footer {
    padding: 16px;
  }
</style>
