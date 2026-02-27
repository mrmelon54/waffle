<script lang="ts">
  let { propKey, propVal, isRequired } = $props();
</script>

<tr>
  <td class="schema-inner-key">{propKey}{isRequired ? "*" : ""}:</td>
  <td class="schema-inner-value">{propVal}</td>
</tr>
