<script lang="ts">
  let { key, required, children } = $props();
</script>

<tr class="schema-property-row">
  <td class="schema-inner-key">{key}{required ? "*" : ""}</td>
  <td class="schema-inner-value">
    {@render children?.()}
  </td>
</tr>

<style lang="scss">
  .schema-property-row {
    > .schema-inner-key {
      text-align: left;
      vertical-align: top;
    }

    > td:first-child {
      padding-right: 16px;
    }
  }
</style>
