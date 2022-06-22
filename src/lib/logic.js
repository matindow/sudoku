import { get } from 'svelte/store';
import { board, boardColumns, boardSquares } from './stores.js';
import { boardStart } from './data.js';

export function getBoard(board) {
	let boardMap = JSON.parse(JSON.stringify(board));

	for (let y = 0; y < board.length; y++) {
		for (let x = 0; x < board[y].length; x++) {
			boardMap[y][x] = {
				coords: { y, x },
				value: board[y][x],
				locked: board[y][x] ? true : false,
				valid: { row: null, column: null, square: null }
			};
		}
	}
	return boardMap;
}

export function checkNine(inputArray) {
	let valueArray = [];
	for (let i = 0; i < inputArray.length; i++) {
		if (inputArray[i].value) {
			valueArray.push(inputArray[i].value);
		}
	}
	for (let i = 1; i <= 9; i++) {
		if (!valueArray.includes(i)) {
			return false;
		}
	}
	return true;
}

export function fixNine(inputArray) {
	let usedNumbers = {};
	let missingNumbers = [];
	let valueArray = [];
	for (let i = 0; i < inputArray.length; i++) {
		if (inputArray[i].value) {
			valueArray.push(inputArray[i].value);
		}
	}
	for (let i = 1; i <= 9; i++) {
		if (!valueArray.includes(i)) {
			missingNumbers.push(i);
		}
	}
	inputArray.sort((a, b) => b.locked - a.locked);
	for (let i = 0; i < inputArray.length; i++) {
		if (!inputArray[i].value || (usedNumbers[inputArray[i].value] && !inputArray[i].locked)) {
			if (missingNumbers.length > 0) {
				let index = Math.floor(Math.random() * missingNumbers.length);
				inputArray[i].value = missingNumbers.splice(index, 1)[0];
			}
		}
		if (inputArray[i].value) {
			usedNumbers[inputArray[i].value] = true;
		}
	}
	let boardLocal = get(board);
	let boardNew = JSON.parse(JSON.stringify(boardLocal));
	for (let cell of inputArray) {
		let { y, x } = cell.coords;
		boardNew[y][x] = cell;
	}
	board.set(boardNew);
}

export function fixRows() {
	for (let row of get(board)) {
		fixNine(row);
	}
}
export function fixColumns() {
	for (let row of get(boardColumns)) {
		fixNine(row);
	}
}
export function fixSquares() {
	for (let row of get(boardSquares)) {
		fixNine(row);
	}
}
export function resetBoard() {
	board.set(getBoard(boardStart));
}
