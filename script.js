const Gameboard = (function(){
    const _gameboardDiv = document.querySelector('.gameboard');
    
    let _players = [];
    let _currentPlayer = 0;

    function drawNewGameboard(){
            for (let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++){
                    _gameboardDiv.appendChild(_createSquare(i,j));
                }
            }
    }

    function addPlayerOne(player){
        _players[0] = player;
    }

    function addPlayerTwo(player){
        _players[1] = player;
    }

    function getCurrentPlayer(){
        return _players[_currentPlayer];
    }

    function _createSquare(x, y){
        const square = document.createElement('div');
        
        square.setAttribute("data-position", `${x},${y}`);
        square.classList.add("square");
        square.textContent = '-';
        square.addEventListener('click', _clickSquare);
    
        return square;
    }

    function _clickSquare(event){
        console.log(event.target.getAttribute('data-position'));
    }

    
    return {
        drawNewGameboard, 
        addPlayerOne, 
        addPlayerTwo, 
        getCurrentPlayer
    }

})();

const Player = function(name, ch){
    let player = {};

    player.name = name;
    player.tick = ch;

    const getName = function(){
        return player.name;
    }

    const getTick(){
        return player.tick;
    }

    return {
        getName,
        getTick
    } 
}

Gameboard.drawNewGameboard();

let playerOne = Player("Tim");
let playerTwo = Player("Eric");

Gameboard.addPlayerOne(playerOne, "X");
Gameboard.addPlayerTwo(playerTwo, "O");
