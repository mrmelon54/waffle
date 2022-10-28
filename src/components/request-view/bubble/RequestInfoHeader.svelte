<script lang="ts">
  export let title: string;
  export let required: boolean = false;
</script>

<div class="request-info-header">
  <span class="request-info-header-tab {required ? 'header-info-required' : ''}">{title}</span>
  <span class="request-info-extra">
    <slot />
  </span>
</div>

<style lang="scss">
  .request-info-header {
    padding: 15px 20px;
    background-color: #252832;
    position: relative;

    > .request-info-header-tab {
      position: relative;

      &::after {
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
    }

    > .request-info-extra {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }
  }
</style>
