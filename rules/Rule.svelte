<script>
	import ExpressionComp from './ExpressionComp.svelte';
	import { AddIsSelected, ExpressionRowsAddNew, ExpresssionRowsDeleteRecursive, ExpresssionRowsLeftRecursive, ExpresssionRowsRightRecursive, ExpresssionRowsDownRecursive, ExpresssionRowsUpRecursive, ExpressionRowsToString } from './ExpressionRow.js';
	import { expressionrows as expressionrowsimported } from './ruledata.js';
	let expressionrows = expressionrowsimported;
	let expressionstring = ExpressionRowsToString(expressionrows);
	AddIsSelected(expressionrows);
	function ExpressionRowsAdd() {
		expressionrows = ExpressionRowsAddNew(expressionrows);
		// expressionrows = [...expressionrows];
	}
	function ExpresssionRowsDelete() {
		expressionrows = ExpresssionRowsDeleteRecursive(expressionrows);
		// expressionrows = [...expressionrows];
	}
	function ExpresssionRowsLeft() {
		expressionrows = ExpresssionRowsLeftRecursive(expressionrows);
		// expressionrows = [...expressionrows];
	}
	function ExpresssionRowsRight() {
		expressionrows = ExpresssionRowsRightRecursive(expressionrows);
		// expressionrows = [...expressionrows];
	}
	function ExpresssionRowsDown() {
		expressionrows = ExpresssionRowsDownRecursive(expressionrows);
		// expressionrows = [...expressionrows];
	}
	function ExpresssionRowsUp() {
		expressionrows = ExpresssionRowsUpRecursive(expressionrows);
		// expressionrows = [...expressionrows];
	}
	$: expressionstring = ExpressionRowsToString(expressionrows);
</script>

<div class="right">
	<button on:click={ExpressionRowsAdd}>+</button>
	<button on:click={ExpresssionRowsDelete}>-</button>
	<button on:click={ExpresssionRowsLeft}>&lt;</button>
	<button on:click={ExpresssionRowsRight}>&gt;</button>
	<button on:click={ExpresssionRowsDown}>&darr;</button>
	<button on:click={ExpresssionRowsUp}>&uarr;</button>
</div>
<br />
{#if expressionrows.length > 0}
	<ExpressionComp
		bind:operator={expressionrows[0].operator}
		bind:expressionrows={expressionrows[0].expressionrows}
		expanded
	/>
{/if}
<textarea bind:value={expressionstring} readonly />

<style>
	.right {
		float: right;
	}
</style>
