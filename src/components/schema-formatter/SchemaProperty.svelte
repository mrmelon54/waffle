<script>
  export let key;
  export let isRequired;
</script>

<tr>
  <td class="schema-inner-key">{key}{isRequired ? "*" : ""}</td>
  <td class="schema-inner-value">
    <slot />
  </td>
</tr>
