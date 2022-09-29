<script>
  export let key;
  export let required;
</script>

<tr class="schema-property-row">
  <td class="schema-inner-key">{key}{required ? "*" : ""}</td>
  <td class="schema-inner-value">
    <slot />
  </td>
</tr>

<style>
  .schema-property-row .schema-inner-key {
    text-align: left;
    vertical-align: top;
  }

  .schema-property-row td:first-child {
    padding-right: 16px;
  }
</style>
