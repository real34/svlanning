<script>
  import Task from "./Task.svelte";
  import FormattedDate from "./FormattedDate.svelte";
  export let day;
</script>

<style>
  h3 {
    margin-top: 4rem;
  }
</style>

<div class="day">
  <h3><FormattedDate date={day.getDate()} /> — {day.label}</h3>

  {#each day.tasks as task}
    <Task task={task} />
  {/each}
</div>