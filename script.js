let grid;

function createGrid(size) {
    grid.innerHTML = "";

    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < size; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
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

        if (
                grid.children[nextX] !== undefined && 
                grid.children[nextX].children[nextY] !== undefined && 
                !grid.children[nextX].children[nextY].classList.contains('path')
            )
            return [nextX, nextY];
    }

    return [x, y];

}

function createPath(size, length) {
    
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    // console.log(x, y);

    for (let i = 0; i < length; i++) {
        let selectedCell = grid.children[x].children[y];

        selectedCell.classList.add('path');

        let newCoords = getNextCell(x, y);
        x = newCoords[0];
        y = newCoords[1];
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

    createGrid(size);

    createPath(size, length)

}


document.addEventListener("DOMContentLoaded", function() {

    grid = document.getElementById('grid');

} );
