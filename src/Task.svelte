<script>
  import Slot from "./Slot.svelte";
  export let task;
</script>

<div class="task">
  <h3>{task.label}</h3>

  {#each task.slots as slot}
    <Slot taskSlot={slot} />
  {/each}
</div>