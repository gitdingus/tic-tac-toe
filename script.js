const gameboardDiv = document.querySelector('.gameboard');

drawGameboard();

function drawGameboard(){

    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            gameboardDiv.appendChild(createSquare(i,j));
        }
    }

}

function createSquare(x, y){
    const square = document.createElement('div');
    
    square.setAttribute("data-position", `${x},${y}`);
    square.classList.add("square");
    square.textContent = '-';
    return square;
}