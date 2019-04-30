<script>
  /*global Papa */
  // import Papa from "papaparse";

  import { ajax } from "rxjs/ajax";
  import { pluck, startWith, tap, map, flatMap, toArray } from "rxjs/operators";
  import Day from "./Day.svelte";
  import toPlanning from "./toPlanning";

  const planning$ = ajax({ url: "data/planning.csv", responseType: "text" }).pipe(
    pluck("response"),
    map(csv => Papa.parse(csv)),
    pluck("data"),
    map(toPlanning),
    startWith([])
  );

  export let name;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Coucou {name}!</h1>

<div>

  {#each $planning$ as day}
    <Day day={day} />
  {/each}
</div>