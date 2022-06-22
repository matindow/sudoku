<script>
	import '../app.css';
	import { board } from './stores.js';
	import Menu from './Menu.svelte';
	import { fade } from 'svelte/transition';

	function fadeOut(node, { delay = 0, duration = 400 }) {
		const o = +getComputedStyle(node).opacity;

		return {
			delay,
			duration,
			css: (t) => `
			position:absolute;
			opacity: ${t * o};
			`
		};
	}

	let menuBind;
</script>

<Menu bind:this={menuBind} />

<grid-section>
	{#each $board as row, y}
		{#each row as cell, x}
			<grid-cell
				{y}
				{x}
				on:mousedown={(e) => menuBind.handleMouseDown(e)}
				on:touchstart|preventDefault={(e) => menuBind.handleMouseDown(e)}
				on:contextmenu|preventDefault={(e) => menuBind.handleContext(e)}
				class:locked={cell?.locked}
				class:valid-row={cell?.valid?.row}
				class:valid-column={cell?.valid?.column}
				class:valid-square={cell?.valid?.square}
			>
				<div class="cell-inner">
					{#key cell.value}
						<number in:fade out:fadeOut>{cell?.value ? cell?.value : ''}</number>
					{/key}
				</div>
			</grid-cell>
		{/each}
	{/each}
</grid-section>

<style>
	grid-section {
		display: grid;
		grid-template-rows: repeat(9, 2rem);
		grid-template-columns: repeat(9, 2rem);
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-khtml-user-select: none; /* Konqueror HTML */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
	}
	grid-cell {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		border: solid 1px lightgrey;		
		transition: background-color 0.5s;
	}

	/* first row */
	grid-cell:nth-child(n):nth-child(-n + 9) {
		border-top: solid 2px;
	}

	/* last column */
	grid-cell:nth-child(9n) {
		border-right: solid 2px;
	}

	/* first column */
	grid-cell:nth-child(3n - 5) {
		border-left: solid 2px black;
	}

	/* janky hardcoded styling for rows 3, 6, and 9 */
	grid-cell:nth-child(n + 19):nth-child(-n + 27),
	grid-cell:nth-child(n + 46):nth-child(-n + 54),
	grid-cell:nth-last-child(n):nth-last-child(-n + 9) {
		border-bottom: solid 2px;
	}
	grid-cell:hover:not(.locked) {
		background-color: lightgrey;
	}
	
	.cell-inner {
		display: grid;
		place-items: center;
	}

	.locked {
		font-weight: bold;
		background-color: darkgrey;
	}

	.valid-row .cell-inner:before {
		content: '';
		border-left: dotted 2px darkgreen;
		position: absolute;
		height: 1.9rem;
		transform: rotate(90deg);
	}

	.valid-column .cell-inner:after {
		content: '';
		border-left: dotted 2px darkgreen;
		position: absolute;
		height: 1.9rem;
	}

	.valid-square {
		background-color: lightgreen;
	}
</style>
