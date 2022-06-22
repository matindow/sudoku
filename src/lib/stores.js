import { boardStart } from './data.js';
import { writable, derived } from 'svelte/store';
import { getBoard, checkNine } from './logic.js';

export const board = writable(getBoard(boardStart));
export const boardColumns = derived(board, ($board) => {
	let byColumns = JSON.parse(JSON.stringify($board));
	for (let i = 0; i < $board[0].length; i++) {
		for (let j = 0; j < $board.length; j++) {
			byColumns[i][j] = $board[j][i];
		}
	}
	return byColumns;
});

export const boardSquares = derived(board, ($board) => {		
	let bySquares = []
	for (let squareRow = 0; squareRow < 3; squareRow++) {
		for (let squareCol = 0; squareCol < 3; squareCol++) {
			let square = [];
			let topLeft = [squareRow * 3, squareCol * 3];
			for (let i = topLeft[0]; i < topLeft[0] + 3; i++) {
				for (let k = topLeft[1]; k < topLeft[1] + 3; k++) {
					square.push($board[i][k]);
				}
			}
			bySquares.push(square);
		}
	}	
	return bySquares;
});

board.subscribe((rows) => {
	for (let row of rows) {
		let valid = checkNine(row);
		for (let cell of row) {
			cell.valid.row = valid;
		}
	}
});

boardColumns.subscribe((columns) => {
	for (let column of columns) {
		let valid = checkNine(column);
		for (let cell of column) {
			cell.valid.column = valid;
		}
	}
});

boardSquares.subscribe((squares) => {
	for (let square of squares) {
		let valid = checkNine(square);
		for (let cell of square) {
			cell.valid.square = valid;
		}
	}
});


