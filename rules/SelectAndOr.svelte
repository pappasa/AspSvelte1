<script>export let value;
function DoNothing(){}
</script>

<select bind:value={value} on:click|stopPropagation={DoNothing}><option>AND</option><option>OR</option></select>