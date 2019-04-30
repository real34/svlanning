<script>
  import Task from "./Task.svelte";
  import Date from "./Date.svelte";
  export let day;
</script>

<details class="day">
  <summary><Date date={day.getDate()} /> — {day.label}</summary>

  {#each day.tasks as task}
    <Task task={task} />
  {/each}
</details>