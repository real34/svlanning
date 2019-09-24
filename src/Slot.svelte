<script>
  export let taskSlot;
</script>

<style>
  .slot {
    color: white;
    background: grey;
    padding: 0.5rem 1rem;
    margin-right: 1px;
    margin-bottom: 1px;
  }

  .filled {
    background: green;
  }

  .role {
    background: darkorange;
    box-shadow: 1px 1px 5px #445448;
    color: black;
    border-radius: 5px;
    padding: 1px 5px;
    margin-right: 5px;
  }
</style>

<div class="slot" class:filled="{taskSlot.person}">
{#if !taskSlot.person}
  <span class="role">{taskSlot.label}</span>
  Click to https://webapps.stackexchange.com/questions/44473/link-to-a-cell-in-a-google-sheets-via-url
  {#if taskSlot.notes}
    <p>Notes : {taskSlot.notes}</p>
  {/if}
{:else}
<details>
  <summary>
    <span class="role">{taskSlot.label}</span>
    {taskSlot.person.firstName} {taskSlot.person.lastName}
    {#if taskSlot.notes}
      <strong>!!</strong>
    {/if}
  </summary>

  <ul>
    {#if taskSlot.person.telephone}
      <li>
        <strong>Téléphone :</strong>
        {taskSlot.person.telephone}
      </li>
    {/if}
    {#if taskSlot.person.email}
      <li>
        <strong>Email :</strong>
        {taskSlot.person.email}
      </li>
    {/if}
  </ul>
  {#if taskSlot.notes}
    <p>Notes : {taskSlot.notes}</p>
  {/if}
</details>
{/if}

</div>
