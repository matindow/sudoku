<script>
	import '../app.css';
	import Board from '../lib/Board.svelte';
	import { fixRows, fixColumns, fixSquares, resetBoard } from '../lib/logic.js';




</script>

<page>
	<section class="buttons">
		<button on:click={fixRows}>fixRows</button>
		<button on:click={fixColumns}>fixColumns</button>
		<button on:click={fixSquares}>fixSquares</button>
		<button on:click={resetBoard}>resetBoard</button>
	</section>
	<Board />
</page>

<style>
	page {
		display: flex;
		flex-direction: column;
		place-items: center;
		height: 100%;
	}
	.buttons {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	button {
		border: solid black 1px;
		border-radius: 0.3rem;
		padding:0.5rem;
		transition: background-color 0.5s, transform 0.25s;
	}
	button:hover {
		background-color: lightgrey;
	}
	button:active{
		background-color: lightgrey;
		transform: scale(0.9);		
	}
</style>
