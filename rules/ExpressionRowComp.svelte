<script>
	import FunctionCallComp, { IsFunctionCallWithParams } from './FunctionCallComp.svelte';
	export let expressionrow;
	import Modal from './Modal.svelte';
	let showModal = false;
	let params = '';
	let target = null;
	function HandleFieldChange(e) {
		if (IsFunctionCallWithParams(e.target.value)) {
			target = e.target;
			params = e.target.value;
			showModal = true;
		}
	}
	$: {
		if (!showModal && target) {
			target.value = params;
			target = null;
		}
	}
</script>

{#if target && IsFunctionCallWithParams(target.value)}
	<Modal bind:showModal>
		<FunctionCallComp bind:value={params} />
	</Modal>
{/if}
<input type="checkbox" bind:checked={expressionrow.isSelected}>
<input
	list="optionsfieldsfunctions"
	bind:value={expressionrow.simpleexpleft}
	on:change={HandleFieldChange}
/>
<input list="optionsoperators" bind:value={expressionrow.operator} />
<input list="optionsfieldsfunctions" bind:value={expressionrow.simpleexpright} />
