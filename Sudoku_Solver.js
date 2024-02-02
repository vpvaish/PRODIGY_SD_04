

document.addEventListener('DOMContentLoaded', () => {
    createSudokuGrid();
});

function createSudokuGrid() {
    const sudokuContainer = document.getElementById('sudoku-container');

    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add('input');
        cell.contentEditable = true;
        cell.addEventListener('input', () => {
            if (!/[1-9]/.test(cell.innerText)) {
                cell.innerText = '';
            }
        });
        sudokuContainer.appendChild(cell);
    }
}

function solveSudoku() {
    const sudokuArray = getGridValues();
    if (!isValidSudoku(sudokuArray)) {
        alert('Invalid Sudoku! Please check the input.');
        return;
    }

    if (solve(sudokuArray)) {
        updateGrid(sudokuArray);
    } else {
        alert('No solution found for the given Sudoku.');
    }
}

function getGridValues() {
    const sudokuContainer = document.getElementById('sudoku-container');
    const cells = sudokuContainer.querySelectorAll('.cell.input');
    const sudokuArray = [];

    cells.forEach(cell => {
        sudokuArray.push(parseInt(cell.innerText) || 0);
    });

    return sudokuArray;
}

function updateGrid(sudokuArray) {
    const sudokuContainer = document.getElementById('sudoku-container');
    const cells = sudokuContainer.querySelectorAll('.cell.input');

    cells.forEach((cell, index) => {
        cell.innerText = sudokuArray[index];
    });
}

function isValidSudoku(sudokuArray) {
    // Add any additional validation logic here if needed
    return true;
}

function solve(grid) {
    const emptyCell = findEmptyCell(grid);
    
    if (!emptyCell) {
        return true; // Solved
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValidMove(grid, row, col, num)) {
            grid[row * 9 + col] = num;

            if (solve(grid)) {
                return true;
            }

            grid[row * 9 + col] = 0; // Backtrack
        }
    }

    return false; // No solution found
}

function findEmptyCell(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row * 9 + col] === 0) {
                return [row, col];
            }
        }
    }
    return null; // No empty cell found
}

function isValidMove(grid, row, col, num) {
    return (
        !usedInRow(grid, row, num) &&
        !usedInCol(grid, col, num) &&
        !usedInBox(grid, row - row % 3, col - col % 3, num)
    );
}

function usedInRow(grid, row, num) {
    for (let col = 0; col < 9; col++) {
        if (grid[row * 9 + col] === num) {
            return true;
        }
    }
    return false;
}

function usedInCol(grid, col, num) {
    for (let row = 0; row < 9; row++) {
        if (grid[row * 9 + col] === num) {
            return true;
        }
    }
    return false;
}

function usedInBox(grid, startRow, startCol, num) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (grid[(startRow + row) * 9 + startCol + col] === num) {
                return true;
            }
        }
    }
    return false;
}


