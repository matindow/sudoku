<script>
	import '../app.css';
	import { board } from './stores.js';
	import { scale } from 'svelte/transition';
	let showMenu = false;
	let mouse = { x: 0, y: 0 };
	let target = { y: null, x: null };
	let selection = '';

	export function handleMouseDown(event) {
		selection = null		
		if (
			(event.type == 'mousedown' && event.button != 0) ||
			event.currentTarget.classList.contains('locked')
		) {
			return false;
		}
		target.y = event.currentTarget.attributes.y.value;
		target.x = event.currentTarget.attributes.x.value;
		mouse.x = event.clientX;
		mouse.y = event.clientY;
		showMenu = true;
	}
	export function handleContext(event) {
		if (event.currentTarget.classList.contains('locked')) {
			return false;
		}
		target.y = event.currentTarget.attributes.y.value;
		target.x = event.currentTarget.attributes.x.value;
		const { y, x } = target;
		$board[y][x].value = null;
	}
	export function handleMouseUp(event) {
		if (event.button != 0) {
			return false;
		}
		const { y, x } = target;
		if (selection) {
			$board[y][x].value = selection;
		}
		selection = null;
		showMenu = false;
	}

	function updateSelection(event) {
		selection = parseInt(event.target.innerText);
	}
</script>

{#if showMenu}
	<menu transition:scale={{ duration: 200 }} style="top: {mouse.y}px; left: {mouse.x}px;">
		{#each { length: 9 } as _, i}
			<grid-cell class:mouse-over={selection == i + 1} on:mouseenter={updateSelection}>
				<number> {i + 1} </number>
			</grid-cell>
		{/each}
	</menu>
{/if}
<svelte:window on:mouseup={handleMouseUp} on:touchup|preventDefault={handleMouseUp} />

<style>
	menu {
		font-size: 1.5rem;
		position: absolute;
		display: grid;
		grid-template-rows: repeat(3, 2rem);
		grid-template-columns: repeat(3, 2rem);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		border: solid 1px black;
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-khtml-user-select: none; /* Konqueror HTML */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently
		
                                    supported by Chrome and Opera */
	}

	grid-cell {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		gap: 1rem;
		z-index: 999;
	}
	grid-cell:hover,
	.mouse-over {
		background-color: lightgrey;
	}
</style>
