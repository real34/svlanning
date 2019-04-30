<script>
  import Task from "./Task.svelte";
  export let day;
</script>

<details class="day">
  <summary>{day.label}</summary>

  {#each day.tasks as task}
    <Task task={task} />
  {/each}
</details>