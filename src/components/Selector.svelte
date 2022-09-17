<script>
  export let value;
</script>

<select id="selector" bind:value={value}>
  <slot/>
</select>

<style>
  #selector {
    box-shadow: none;
    outline-color: currentcolor;
    border: 2px solid #25a05c;
    flex: 2;
    outline: none;
    appearance: none;
    border-radius: 4px;
    color: #c7c2bb;
    background: #2d303b url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="%23c7c2bb" d="M13.418 7.859a.695.695 0 0 1 .978 0 .68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969.695.695 0 0 1 .978 0L10 11l3.418-3.141z"/></svg>') right 10px center no-repeat;
    background-size: 20px;
    padding: 5px 40px 5px 10px;
  }
</style>