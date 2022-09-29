<script>
  export let key;
  export let required;
</script>

<tr>
  <td class="schema-inner-key">{key}{required ? "*" : ""}</td>
  <td class="schema-inner-value">
    <slot />
  </td>
</tr>
