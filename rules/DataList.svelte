<script>
	export let id = 'datalist';
    export let optionvalues = [];
</script>

<datalist id={id}>
    {#each optionvalues as optionvalue}
	<option value={optionvalue} />
    {/each}
</datalist>
