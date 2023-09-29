<script>
	import ExpressionRowComp from './ExpressionRowComp.svelte';
	import DataList from './DataList.svelte';
	import SelectAndOr from './SelectAndOr.svelte';

	export let expanded = false;
	export let operator = '';
	export let expressionrows = [];

	let optionfieldsfunctions = [
		'AMOUNT',
		'CCY',
		'BENEFBANKBIC',
		'ISVALIDCORRESPONDENT(BIC: string, CCY: string)'
	];
	let optionfields = optionfieldsfunctions.filter((v) => !v.includes('('));
	let optionoperators = ['<', '<=', '=', '!=', '>=', '>'];

	function toggle() {
		expanded = !expanded;
	}
</script>

<DataList id="optionsfieldsfunctions" optionvalues={optionfieldsfunctions} />
<DataList id="optionsfields" optionvalues={optionfields} />
<DataList id="optionsoperators" optionvalues={optionoperators} />
<button class:expanded on:click={toggle}><SelectAndOr bind:value={operator} /></button>
{#if expanded}
	<ul>
		{#each expressionrows as expressionrow}
			<li>
				{#if expressionrow.expressionrows}
					<svelte:self {...expressionrow} />
				{:else}
					<ExpressionRowComp bind:expressionrow={expressionrow} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	button {
		padding: 0 0 0 1.5em;
		background: url(src/components/rules/icons/folder.svg) 0 0.1em no-repeat;
		background-size: 1em 1em;
		color: var(--fg-1);
		font-weight: bold;
		cursor: pointer;
		border: none;
		margin: 0;
		text-align: left;
	}

	.expanded {
		background-image: url(icons/folder-open.svg);
	}

	ul {
		padding: 0.2em 0 0 0.5em;
		margin: 0 0 0 0.5em;
		list-style: none;
		border-left: 1px solid rgba(128, 128, 128, 0.4);
	}

	li {
		padding: 0.2em 0;
	}
</style>
