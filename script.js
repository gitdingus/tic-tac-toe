const Gameboard = (function(){
    const _gameboardDiv = document.querySelector('.gameboard');
    const _gameboardArr = [];
    let _players = [];
    let _currentPlayer = 0;

    function drawNewGameboard(){
            for (let i = 0; i < 3; i++){
                _gameboardArr[i] = [];
                for (let j = 0; j < 3; j++){
                    _gameboardDiv.appendChild(_createSquare(i,j));
                    _gameboardArr[i][j] = null;
                }
            }

            _gameboardDiv.addEventListener("click", _clickBoard);
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
    
        return square;
    }

    function _clickBoard(event){
        console.log(`${getCurrentPlayer().getName()} clicked ${event.target.getAttribute("data-position")}`);
        
        const squareDiv = event.target;
        const coordinates = squareDiv.getAttribute("data-position").split(",");

        if (_gameboardArr[coordinates[0]][coordinates[1]] === null){
            _gameboardArr[coordinates[0]][coordinates[1]] = getCurrentPlayer();
            squareDiv.textContent = getCurrentPlayer().getTick();

            if (_checkVictory(coordinates) === true){

                alert(`${getCurrentPlayer().getName()} has won the game!`);
            }
            else{
                 _switchCurrentPlayer();
            }
        }

    }

    function _checkVictory(lastClicked){
        if (_checkRow(lastClicked[0]) === true || _checkColumn(lastClicked[1])  === true || _checkDiagonal() === true){
            return true;
        }
        else {
            return false;
        }

        
    }

    function _checkRow(y){
        for (let i = 0; i < 3; i++){
            if (_gameboardArr[y][i] !== getCurrentPlayer()){
                return false;
            }
        }

        return true;
    }

    function _checkColumn(x){
        for (let i = 0; i < 3; i++){
            if (_gameboardArr[i][x] !== getCurrentPlayer()){
                return false;
            }
        }

        return true;
    }

    function _checkDiagonal(){
        const currentPlayer = getCurrentPlayer();
        if (_gameboardArr[0][0] === currentPlayer && _gameboardArr[1][1] === currentPlayer && _gameboardArr[2][2] === currentPlayer){
            return true;
        }
        else if (_gameboardArr[2][0] === currentPlayer && _gameboardArr[1][1] === currentPlayer && _gameboardArr[0][2] === currentPlayer){
            return true;
        }
        else{
            return false;
        }
    }

    function _switchCurrentPlayer(){
        _currentPlayer = ++_currentPlayer % 2;
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

    const getTick = function() {
        return player.tick;
    }

    return {
        getName,
        getTick
    } 
}

Gameboard.drawNewGameboard();

let playerOne = Player("Tim", "X");
let playerTwo = Player("Eric", "O");

Gameboard.addPlayerOne(playerOne);
Gameboard.addPlayerTwo(playerTwo);
