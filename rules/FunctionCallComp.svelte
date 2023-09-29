<script  context="module">
    // regex for function name with at least one parameter
    let regex = /(?<functionname>\w+)\((?<params>\w+[\w\s,:]*)\)/;
    export function IsFunctionCallWithParams(s) {
        return regex.test(s);
    }
</script>
<script>
	import { afterUpdate } from 'svelte';
	export let value;
	let m = value.match(regex);
	if (m == null) throw 'Expression {simpleexp} is not a function call with parameters.';
	let functionname = m.groups.functionname;
	let paramsstring = m.groups.params;
	let params = [];
	let paramsitems = paramsstring.split(',');
    //param may be ccy: string, or just ccy.
	paramsitems.map((param) => {
		let items = param.split(':');
		if (items[0] == '') throw 'Parameter name is empty in param declaration {param}.';
        let paramtype = items.length > 1 ? items[1] : '';
		params.push({ paramname: items[0].trim(), paramtype: paramtype.trim(), paramvalue: '' });
	});
	afterUpdate(() => {
		paramsstring = params.reduce((ac, cv) => `${ac}, ${cv.paramvalue}`, '').substring(2);
		value = `${functionname}(${paramsstring})`;
	});
</script>

<ul>
	{#each params as param}
		<li>
			<label>
				<span>{param.paramname}:</span>
				<input list="optionsfields" bind:value={param.paramvalue} />
			</label>
		</li>
	{/each}
</ul>
