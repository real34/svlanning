<script>
  /*global Papa */

  import ApolloClient, { gql } from "apollo-boost";
  import { setClient, getClient, query } from "svelte-apollo";

  import { ajax } from "rxjs/ajax";
  import { pluck, startWith, tap, map, flatMap, toArray } from "rxjs/operators";
  import Planning from "./Planning.svelte";
  import toPlanning from "./toPlanning";

  import tokenJWT from "./stores/authToken";

  $: client = new ApolloClient({
    uri: "https://api.lachouettecoop.fr",
    headers: $tokenJWT ? {
      Authorization: $tokenJWT
    } : {}
  });
  $: setClient(client);

  $: version = query(client, {
    query: gql`
      {
        version
      }
    `
  });
  $: user = query(client, {
    query: gql`
      {
        me {
          prenom
        }
      }
    `
  });

  function handleSubmit() {
    $tokenJWT = this.elements.token.value.trim();
  }

  function handleReset() {
    $tokenJWT = undefined;
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

<h1>
  Le Chouette Planning
  {#await $version then result}
    <small>(v{result.data.version})</small>
  {/await}
</h1>

<p class="warning">
Ce site est un prototype expérimental dont le but est de permettre un début de
discussion sur un nouvel outil. Il n'est en aucun cas final et officiel !
</p>

<div>
  {#if !$tokenJWT}
    <form on:submit|preventDefault={handleSubmit}>
      <p>
        Veuillez renseigner votre token JWT pour accéder au planning.
      </p>

      <label for="token">Token JWT</label>
      <input name="token" type="text" size="50" />

      <button type="submit">S'identifier</button>
    </form>
  {:else}
    <p>
      {#await $user then user}
        Bienvenue {user.data.me.prenom} !
      {/await}
      <button on:click={handleReset}>Se déconnecter</button>
    </p>

    {"<Planning />"}
  {/if}
</div>
