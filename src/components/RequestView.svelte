<script>
  export let open = false;
  export let req;

  function handleClick() {
    open = !open;
  }
</script>

<div class="request {open ? 'dropdown-open' : 'dropdown-closed'}">
  <div class="request-summary" on:click={handleClick}>
    <h5><span class="request-method">{req.$method}</span><span>{req.$path}</span><span>{req.summary}</span></h5>
  </div>
  <div class="request-content">
    <slot />
  </div>
</div>

<style>
  .dropdown {
    padding: 8px 16px;
    border-radius: 16px;
  }

  .dropdown > .dropdown-title {
    position: relative;
    border-radius: 16px;
    border-color: var(--method-color);
    border-width: 2px;
    border-style: solid;
  }

  .dropdown > .dropdown-title > h5 {
    background-color: var(--method-color);
  }

  .dropdown > .dropdown-title::after {
    content: "";
    position: absolute;
    background: transparent url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="%23c7c2bb" d="M13.418 7.859a.695.695 0 0 1 .978 0 .68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969.695.695 0 0 1 .978 0L10 11l3.418-3.141z"/></svg>') right 10px center no-repeat;
    background-size: 40px;
    width: 60px;
    height: 60px;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    transition: ease-in-out transform 500ms;
  }

  .dropdown.dropdown-open > .dropdown-title::after {
    transform: translateY(-50%) rotate(180deg);
  }

  .dropdown.dropdown-closed > .dropdown-content {
    display: none;
  }
</style>
