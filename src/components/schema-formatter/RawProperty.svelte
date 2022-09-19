<script>
  export let propKey;
  export let propVal;
  export let isRequired;
</script>

<tr>
  <td class="schema-inner-key">{propKey}{isRequired ? "*" : ""}:</td>
  <td class="schema-inner-value">{propVal}</td>
</tr>
