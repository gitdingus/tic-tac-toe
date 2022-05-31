const GameController = (function(){
    const _newGameModal = document.querySelector("#modal");
    const _openNewGameModal = document.querySelector("#open-new-game-modal");
    const _newGameForm = document.querySelector("#new-game-form");
    const _cancelNewGameButton = document.querySelector("#cancel-new-game-button");
    const _playerOneInput = document.querySelector("#player-one-input");
    const _playerTwoInput = document.querySelector("#player-two-input");
    const _playerOneLabel = document.querySelector(".player.player-one p");
    const _playerTwoLabel = document.querySelector(".player.player-two p");

    _openNewGameModal.addEventListener("click", _toggleNewGameScreen);
    _cancelNewGameButton.addEventListener("click", _toggleNewGameScreen);
    _newGameForm.addEventListener("submit", _createNewGame);
    
    function _createNewGame(e){
        e.preventDefault();

        let playerOne = Player(_playerOneInput.value, "X");
        let playerTwo = Player(_playerTwoInput.value, "O");

        Gameboard.newGame(playerOne, playerTwo);

        _playerOneLabel.textContent = playerOne.getName();
        _playerTwoLabel.textContent = playerTwo.getName();

        _toggleNewGameScreen();


    }
    function _toggleNewGameScreen(){
        _newGameModal.classList.toggle("active");
    }

    return {
        
    }
})();

const Gameboard = (function(){
    const _gameboardDiv = document.querySelector('.gameboard');
    const _gameboardArr = [];
    let _players = [];
    let _currentPlayer = 0;

    function newGame(playerOne, playerTwo){
        _players = [];
        _players.push(playerOne);
        _players.push(playerTwo);

        _currentPlayer = 0;

        _clearGameboard();
        _drawNewGameboard();
    }

    function getCurrentPlayer(){
        return _players[_currentPlayer];
    }

    function _drawNewGameboard(){
        for (let i = 0; i < 3; i++){
            _gameboardArr[i] = [];
            for (let j = 0; j < 3; j++){
                _gameboardDiv.appendChild(_createSquare(i,j));
                _gameboardArr[i][j] = null;
            }
        }

        _gameboardDiv.addEventListener("click", _clickBoard);
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
                _gameboardDiv.removeEventListener("click", _clickBoard);
            }
            else{
                if (_gameboardFull() === false){
                     _switchCurrentPlayer();
                }
                else{
                    alert ("Draw!");
                    _gameboardDiv.removeEventListener("click", _clickBoard);
                }
            }
        }

    }

    function _gameboardFull(){
        emptySpaces = _gameboardArr.some( (row) => {
            return row.some( (item) => {
                return item === null;
            });
        });

        return !emptySpaces;
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

    function _clearGameboard() {
        squares = Array.from(_gameboardDiv.querySelectorAll(".square"));
        squares.forEach( s => _gameboardDiv.removeChild(s) );
    }

    
    return {
        newGame,
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
