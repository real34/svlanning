<script>
  export let date;
</script>

{
  date.toLocaleString('fr-FR', {
    year: "numeric",
    month: "long",
    day: "2-digit"
  })
}