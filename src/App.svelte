<script>
  /*global Papa */
  // import Papa from "papaparse";

  import { ajax } from "rxjs/ajax";
  import { pluck, startWith, tap, map } from "rxjs/operators";
  import Row from "./Row.svelte";

  const rows$ = ajax({ url: "data/planning.csv", responseType: "text" }).pipe(
    pluck("response"),
    map(csv => Papa.parse(csv)),
    pluck("data"),
    tap(v => console.log(v)),
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

<table>
  <tbody>
  {#each $rows$ as row}
    <Row row={row} />
  {/each}
  </tbody>
</table>
</div>