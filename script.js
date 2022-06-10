let grid;
let timerInterval;
let gameProgress;
let levelStarted = false;

function createGrid(size) {
    grid.innerHTML = "";

    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < size; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', cellClicked, false);
            cell.addEventListener('mouseenter', cellHovered, false);

            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
}

function finishLevel(){
    gameProgress++;
    levelStarted = false;
    if (gameProgress < 5) {
        createGridAndPath('easy');
    }else if (gameProgress < 10) {
        createGridAndPath('medium');
    }else if (gameProgress < 15) {
        createGridAndPath('hard');
    }else {
        gameProgress = 0;
        clearInterval(timerInterval);
        alert(`Vous avez gagné en ${timer.textContent} secondes!`);
    }
}

function resetLevel() {
    levelStarted = false;

    setTimeout(function () {
        let hoveredCells = document.querySelectorAll('.hovered, .wrong');
        for (let i = 0; i < hoveredCells.length; i++) {
            hoveredCells[i].classList.remove('hovered');
            hoveredCells[i].classList.remove('wrong');
        }
    }, 200);

}

function hoverCell(element) {
    if (!element.classList.contains("path") || element.classList.contains("hovered")) {
        element.classList.add('wrong');

        resetLevel();
    }else{
        element.classList.add('hovered');
    }

    hoveredCells = document.querySelectorAll('.cell.hovered');
    pathCells = document.querySelectorAll('.cell.path');
    if (hoveredCells.length === pathCells.length) {
        console.log("caca");
        finishLevel();
    }
}

function cellClicked() {
    levelStarted = true;
    hoverCell(this);
}
function cellHovered() {
    if (!levelStarted) return;
    hoverCell(this);
}

function getNextCell(x, y) {
    let nextX = -1;
    let nextY = -1;

    for (let i = 0; i < 1000; i++) {

        let direction = Math.floor(Math.random() * 2);
        let absolute = Math.floor(Math.random() * 2) * 2 - 1;

        if (direction === 0) {
            nextX = x + absolute;
            nextY = y;
        } else {
            nextX = x;
            nextY = y + absolute;
        }

        if ( grid.children[nextX] !== undefined && grid.children[nextX].children[nextY] !== undefined && !grid.children[nextX].children[nextY].classList.contains('path') )
            return [true, nextX, nextY];
    }

    return [false, x, y];

}

function createPath(size, length) {

    createGrid(size);
    
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    // console.log(x, y);

    for (let i = 0; i < length; i++) {
        let selectedCell = grid.children[x].children[y];

        selectedCell.classList.add('path');

        let newCoords = getNextCell(x, y);
        if (newCoords[0]) {
            x = newCoords[1];
            y = newCoords[2];
        }else {
            createGrid(size);
            x = Math.floor(Math.random() * size);
            y = Math.floor(Math.random() * size);
            i = 0;
        }
    }
}

function createGridAndPath(difficulty) {
    let size;
    let length;
    switch (difficulty) {
        case 'easy':
            size = 5;
            length = 10;
            break;
        case 'medium':
            size = 6;
            length = 15;
            break;
        case 'hard':
            size = 8;
            length = 20;
            break;
    }

    createPath(size, length)

}

function startGame() {
    gameProgress = 0;

    const timer = document.getElementById('timer');
    timer.textContent = "0";

    timerInterval = setInterval(function() {
        timer.textContent = parseInt(timer.textContent) + 1;
    }, 1000);

    createGridAndPath('easy');

}


document.addEventListener("DOMContentLoaded", function() {

    grid = document.getElementById('grid');
    grid.addEventListener('mouseenter', cellHovered, false);



} );
