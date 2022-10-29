<script lang="ts">
  export let title: string;
  export let required: boolean = false;
</script>

<div class="request-info-header">
  <span class="request-info-header-tab {required ? 'header-info-required' : ''}">{title}</span>
  <!-- <span class="request-info-gap" /> -->
  <span class="request-info-extra">
    <slot />
  </span>
</div>

<style lang="scss">
  .request-info-header {
    padding: 0 8px;
    background-color: #252832;
    display: flex;
    flex-wrap: wrap;

    > .request-info-header-tab {
      position: relative;
      line-height: 30px;
      margin: 10px 16px;
      max-height: 50px;

      &::after {
        content: "";
        background-color: var(--method-high-color);
        display: block;
        width: 116%;
        height: 4px;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    > .request-info-extra {
      margin: 10px 16px;
      margin-left: auto;
      max-height: 50px;

      // Equivalent to `margin-left: min(auto, 16px);`
      &::before {
        content: "";
        width: 16px;
        display: inline-block;
      }
    }
  }
</style>
