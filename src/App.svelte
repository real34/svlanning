<script>
  /*global Papa */

  import { ajax } from "rxjs/ajax";
  import { pluck, startWith, tap, map, flatMap, toArray } from "rxjs/operators";
  import Planning from "./Planning.svelte";
  import toPlanning from "./toPlanning";

  let sheetId;
  $: planningUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&id=${sheetId}`;
  $: planning =
    sheetId &&
    new Promise((complete, error) =>
      Papa.parse(planningUrl, {
        download: true,
        complete,
        error
      })
    )
      .then(result => result.data)
      .then(toPlanning);

  function handleSubmit() {
    sheetId = this.elements.identifiant.value.trim();
  }

  function handleReset() {
    sheetId = undefined;
  }
</script>

<style>
  h1 {
    color: #445448;
  }

  .warning {
    background-color: orange;
    padding: 1rem;
    font-size: 0.8rem;
  }
</style>

<h1>Le Chouette Planning</h1>

<p class="warning">
  Ce site est un prototype expérimental dont le but est de permettre un début de
  discussion sur un nouvel outil. Il n'est en aucun cas final et officiel !
</p>

<div>
  {#if !sheetId}
    <form on:submit|preventDefault={handleSubmit}>
      <p>
        Veuillez renseigner l'identifiant de la feuille Google Sheet contenant
        le planning.
        <br />
        <em>
          Exemple : https://docs.google.com/spreadsheets/d/
          <strong>2QryWNsR34pRuUfz5HyQPEIlTDa9JiSp1kUorcU9merM</strong>
          /edit
        </em>
      </p>

      <label for="identifiant">Identifiant de la feuille</label>
      <input name="identifiant" type="text" size="50" />

      <button type="submit">Afficher le planning</button>
    </form>
  {:else}
    {#await planning}
      Chargement du planning en cours…
    {:then days}
      <p>
        <button on:click={handleReset}>Charger un autre planning</button>
      </p>
      <Planning {days} />
    {:catch error}
      <p>Une erreur est survenue : {error}</p>
      <p>
        <button on:click={handleReset}>Charger un autre planning</button>
      </p>
    {/await}
  {/if}
</div>
