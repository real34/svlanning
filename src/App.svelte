<script>
  /*global Papa */
  // import Papa from "papaparse";

  import { ajax } from "rxjs/ajax";
  import { pluck, startWith, tap, map, flatMap, toArray } from "rxjs/operators";
  import Planning from "./Planning.svelte";
  import toPlanning from "./toPlanning";

  export let planningUrl;

  const planning = new Promise((complete, error) =>
    Papa.parse(planningUrl, {
      download: true,
      complete,
      error
    })
  )
    .then(result => result.data)
    .then(toPlanning);
</script>

<style>
  h1 {
    color: #445448;
  }
</style>

<h1>Le Chouette Planning</h1>

<div>
  {#await planning}
    Chargement du planning en cours…
  {:then days}
    <Planning days={days} />
  {/await}
</div>