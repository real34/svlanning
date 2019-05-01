<script>
  import Slot from "./Slot.svelte";
  export let task;
</script>

<style>
  .task {
    margin-top: 2rem;
  }
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    align-content: stretch;
  }
  .slot {
    flex-grow: 1;
    align-self: center;
  }
</style>

{#if task.isStaffed()}
<div class="task">
  <h4>{task.label}</h4>

  <div class="container">
  {#each task.slots as slot}
    <div class="slot">
      <Slot taskSlot={slot} />
    </div>
  {/each}
  </div>
</div>
{/if}