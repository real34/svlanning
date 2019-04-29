<script>
  export let row;
</script>

<tr class="row">
  {#each row as cell}
    <td>{cell}</td>
  {/each}
</tr>