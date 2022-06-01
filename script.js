const GameController = (function(){
    const _newGameModal = document.querySelector("#new-game-modal");
    const _outcomeModal = document.querySelector("#outcome-modal-container");
    const _openNewGameModal = document.querySelector("#open-new-game-modal");
    const _newGameForm = document.querySelector("#new-game-form");
    const _cancelNewGameButton = document.querySelector("#cancel-new-game-button");
    const _playerOneInput = document.querySelector("#player-one-input");
    const _playerTwoInput = document.querySelector("#player-two-input");
    const _playerOneLabel = document.querySelector(".player.player-one p");
    const _playerTwoLabel = document.querySelector(".player.player-two p");
    const _gameboardDiv = document.querySelector('.gameboard');

    _openNewGameModal.addEventListener("click", _toggleNewGameScreen);
    _cancelNewGameButton.addEventListener("click", _toggleNewGameScreen);
    _newGameForm.addEventListener("submit", _createNewGame);
    _outcomeModal.addEventListener("click", _toggleOutcomeModal);
    
    function _createNewGame(e){
        e.preventDefault();

        let playerOne = Player(_playerOneInput.value, "X");
        let playerTwo = Player(_playerTwoInput.value, "O");

        Gameboard.newGame(playerOne, playerTwo);

        _clearGameboard();
        _drawNewGameboard();
        _gameboardDiv.addEventListener("click", _clickBoard);

        _playerOneLabel.textContent = playerOne.getName();
        _playerTwoLabel.textContent = playerTwo.getName();

        _toggleNewGameScreen();


    }

    function _clearGameboard() {
        squares = Array.from(_gameboardDiv.querySelectorAll(".square"));
        squares.forEach( s => _gameboardDiv.removeChild(s) );
    }

    function _clickBoard(event){
        const squareDiv = event.target;
        const coordinates = squareDiv.getAttribute("data-position").split(",");

        let outcome = Gameboard.playPosition(coordinates[0], coordinates[1]);

        if (outcome.valid === true){
            squareDiv.textContent = outcome.player.getTick();
            if (outcome.victory !== undefined){
                _displayOutcome(`${outcome.victory} has won!`);
                _deactivateGameboard();
            }
            else if (outcome.draw === true){
                _displayOutcome(`Game ended in a draw!`);
                _deactivateGameboard();
            }

        }

    }

    function _createSquare(x, y){
        const square = document.createElement('div');
        
        square.setAttribute("data-position", `${x},${y}`);
        square.classList.add("square");
        square.textContent = '';
    
        return square;
    }

    function _deactivateGameboard(){
        _gameboardDiv.removeEventListener("click", _clickBoard);
    }
    function _drawNewGameboard(){
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                _gameboardDiv.appendChild(_createSquare(i,j));
            }
        }
    }

    function _toggleNewGameScreen(){
        _newGameModal.classList.toggle("active");
    }

    function _toggleOutcomeModal(){
        _outcomeModal.classList.toggle("active");
    }


    function _displayOutcome(message){
        const outcomeMessage = _outcomeModal.querySelector("h1");
        outcomeMessage.textContent = message;

        _outcomeModal.classList.toggle("active");
    }

    function showBlankGameboard(){
        _drawNewGameboard();
    }

    return {
        showBlankGameboard
    }
})();

const Gameboard = (function(){
    const _gameboardArr = [];
    let _players = [];
    let _currentPlayer = 0;

    function newGame(playerOne, playerTwo){
        _players = [];
        _players.push(playerOne);
        _players.push(playerTwo);

        _currentPlayer = 0;
        _resetGameboard();
    }

    function getCurrentPlayer(){
        return _players[_currentPlayer];
    }

    function playPosition(x,y){
        let outcomes = {};
        outcomes.player = getCurrentPlayer();
        if (_gameboardArr[x][y] === null){
            _gameboardArr[x][y] = getCurrentPlayer();
            outcomes.valid = true;
            if (_checkVictory(x,y) === true){
                outcomes.victory = getCurrentPlayer().getName();
            }
            else if (_gameboardFull() === true){
                outcomes.draw = true;
            }

            _switchCurrentPlayer();
        }
        else{
            outcomes.valid = false;
        }


        return outcomes;
    }
    function _resetGameboard(){
        for (let i = 0; i < 3; i++){
            _gameboardArr[i] = [];
            for (let j = 0; j < 3; j++){
                _gameboardArr[i][j] = null;
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

    function _checkVictory(row, col){
        if (_checkRow(row) === true || _checkColumn(col)  === true || _checkDiagonal() === true){
            return true;
        }
        else {
            return false;
        }     
    }

    function _checkRow(row){
        for (let i = 0; i < 3; i++){
            if (_gameboardArr[row][i] !== getCurrentPlayer()){
                return false;
            }
        }

        return true;
    }

    function _checkColumn(col){
        for (let i = 0; i < 3; i++){
            if (_gameboardArr[i][col] !== getCurrentPlayer()){
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
        newGame,
        playPosition
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

GameController.showBlankGameboard();