// Object that stores the current status of the grid/board
const state = {
    cells: ['', '', '',
        '', '', '',
        '', '', ''],
    nextPlayer: 'X',
    isGameOver: false
};

// Check whether game is over
function isGameOver() {
    const winningStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // If any 3 cells in succession (stored in winning states object) are same, return true
    for (let i = 0; i < winningStates.length; i++) {
        const winningState = winningStates[i];
        if (state.cells[winningState[0]] !== '' && state.cells[winningState[0]] === state.cells[winningState[1]] && state.cells[winningState[1]] === state.cells[winningState[2]]) {
            return true;
        }
    }
    return false;
}

function showNextPlayer() {
    document.querySelector('.next-player').innerHTML = state.nextPlayer;
}

// This function only plays around with JS
// Set next player
// Set value of cell in grid on click
function bindListeners() {
    const gridCells = Array.from(document.querySelectorAll('.grid-cell'));
    gridCells.forEach(function (gridCell) {
        gridCell.addEventListener('click', function (event) {
            // Event of the target
            const cell = event.target;
            const cellIndex = cell.getAttribute('data-cell-index');
            if (state.cells[cellIndex] == '') {
                state.cells[cellIndex] = state.nextPlayer;
                state.nextPlayer = (state.nextPlayer === 'X' ? 'O' : 'X');
                render(); // This is the function that modifies HTML

                if (isGameOver()) {
                    alert("Game over");
                }
            }
            else {
                alert('You have selected a box which was already filled. Please select another.');
            }
        });
    })
}

// Show what cells are marked, entire grid is updated based on state.cells on each click
// Show next player
function render() {
    const gridCells = Array.from(document.querySelectorAll('.grid-cell'));
    gridCells.forEach(function (gridCell, index) {
        gridCell.innerHTML = state.cells[index];
    });

    showNextPlayer();
}

// Function that calls render and bindListener functions, they have been put in 1 so that only one call is needed to call both
function init() {
    render();
    bindListeners();
}

// Execute init function as soon as browser is ready
document.addEventListener('DOMContentLoaded', init);

// Reset the entire grid
// This also resets the current state (so both JS and HTML)
let button = document.querySelector('input');
button.addEventListener('click', function () {
    const gridCells = Array.from(document.querySelectorAll('.grid-cell'));
    for (var i = 0; i < gridCells.length; i++) {
        gridCells[i].innerHTML = '';
        state.cells[i] = '';
    };
    state.isGameOver = false;
    state.nextPlayer = 'X';
    showNextPlayer();
})