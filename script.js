const gridBtn = document.querySelectorAll('.game-button');

(function() {
    let gridArray = ["", "", "", "", "", "", "", "", "",];
    let gameInitialize = {
        scoreX: 0,
        scoreO: 0,
        computerChoice: "",
        playerChoice: "",
        playerSelectionDialog: function() {
            const body = document.querySelector('body');
            const selectionDialog = document.createElement('dialog');
            const xBtn = document.createElement('button');
            const oBtn = document.createElement('button');
            const introText = document.createElement('h1');
            introText.textContent = "Select your fighter:";
            xBtn.textContent = "X";
            oBtn.textContent = "O";
            body.appendChild(selectionDialog);
            selectionDialog.showModal();
            selectionDialog.appendChild(introText);
            selectionDialog.appendChild(xBtn).classList.add('x-button');
            selectionDialog.appendChild(oBtn).classList.add('o-button');
            selectionDialog.addEventListener('cancel', (e) => {
                e.preventDefault();
            });
            selectionDialog.addEventListener('click', (e) => {
                const target = e.target;
                if(target === xBtn){
                    this.playerChoice = "X";
                    this.computerChoice = "O";
                    selectionDialog.close();
                    gameInitialize.showGrid();
                } else if (target === oBtn){
                    this.playerChoice = "O";
                    this.computerChoice = "X";
                    selectionDialog.close();
                    gameInitialize.showGrid();
                }
            });
        },
        showGrid: function() {
            const mainDoc = document.querySelector('.master-container');
            mainDoc.classList.remove('off');
        },
    }
    gameInitialize.playerSelectionDialog();
    
    let winnerFound = false;
    let roundEndCheck = 0;
    const gameGrid = document.querySelector('.game-grid');
    let playGame = {
        playersTurn: function() {
            gameGrid.addEventListener('click', (e) => { // listen to grid container, instead of individual buttons
                if (e.target.matches('.game-button')) { 
                // checks if elem clicked inside the container has the class 'game-button'
                    let btnClasslist = e.target.classList; // grabs the second class, which are numbers for their 'positions'
                    let btnPosition = btnClasslist.item(1); // assigns the button position to matching array[#]
                    if (gridArray[btnPosition] === "" && winnerFound === false) {
                        e.target.style.color = "rgb(0, 81, 255)";
                        e.target.textContent = gameInitialize.playerChoice;
                        gridArray[btnPosition] = gameInitialize.playerChoice;
                        roundEndCheck = 0;
                        playGame.checkWinner();
                    } else {
                        return;
                    }
                    if (roundEndCheck === 1){ // once you create something to appear when the round is over (to start new round) if the player won make it run the 'computersTurn' function after it resets the grid, that way the computer goes first if the player wins, but by default the player will go first if the computer wins
                        return;
                    } else { 
                        setTimeout(playGame.computersTurn, 30);
                    }
                }
            });
        },

        computersTurn: function() {
            if (winnerFound === true) {
                return;
            } else if (gridArray == ["", "", "", "", "", "", "", "", "",]){
                return;
            } else if (gridArray.indexOf("") === -1){
                gridArray = ["", "", "", "", "", "", "", "", "",];
                gridBtn.forEach((button) => {
                    button.textContent = "";
                });
                alert("oopsies!");
                return;
            };

            let computerGenerator = Math.floor(Math.random() * 9);
            let compGridBtn = document.querySelector('.game-grid button:nth-child('+ (computerGenerator +1) +')'); // gets the button for the grid from its class
            if (gridArray[computerGenerator] != ""){
                computerGenerator = Math.floor(Math.random() * 9);
                setTimeout(playGame.computersTurn, 10);
            } else if (gridArray[computerGenerator] === ""){
                compGridBtn.style.color = "red";
                compGridBtn.textContent = gameInitialize.computerChoice;
                gridArray[computerGenerator] = gameInitialize.computerChoice;

                playGame.checkWinner();
                computerGenerator = Math.floor(Math.random() * 9);
            } else {
                return;
            }
            setTimeout(playGame.tieCheck, 20);
        },

        computersTurnOnLoss: function(winner) {
            if(winner === playGame.playerChoice){
                setTimeout(playGame.computersTurn, 100);
            }
        },

        tieCheck: function(){
            if (gridArray.indexOf("") === -1){
                gridArray = ["", "", "", "", "", "", "", "", "",];
                gridBtn.forEach((button) => {
                    button.textContent = "";
                });
                alert("TIE!");
                return;
            }
        },

        checkWinner: function() {
            if (winnerFound === true){
                return;
            }

            const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] ];           // Diagonals

            let player = gameInitialize.playerChoice;
            let computer = gameInitialize.computerChoice;
            // below checks sub-arrays in 'winningCombinations' against gridArray w/ all values matching player/comp letter
            if(player === ""){
                return;
            } else {
                let winner;
                if (winningCombinations.some(subArray => subArray.every(values => gridArray[values] === player))) {
                    winnerFound = true;
                    winner = player;
                    roundEndCheck = 1;
                    playGame.increaseScore(winner);
                } else if (winningCombinations.some(subArray => subArray.every(values => gridArray[values] === computer))) {
                    winnerFound = true;
                    winner = computer;
                    playGame.increaseScore(winner);
                };
            };
        },

        increaseScore: function(winner) {
            // add ternary operator to avoid repetition
            let scoreToUpdate = (winner === "X") ? 'x-score' : 'o-score';
            gameInitialize['score' + winner]++;
            document.querySelector('.' + scoreToUpdate).textContent = gameInitialize['score' + winner];
            setTimeout(() => {
                if(gameInitialize['score' + winner] === 5){
                    if(gameInitialize.playerChoice === winner){
                        playGame.roundOver(winner);
                    } else {
                        playGame.roundOver(winner);
                    }
                } else {
                    playGame.roundOver(winner);
                }
            }, 20)
        },

        roundOver: function(winner) {
            // add ternary operators to avoid repetition
            const dialogClass = (gameInitialize.scoreX === 5 || gameInitialize.scoreO === 5) ? 'restart' : 'continue';
            const body = document.querySelector('body');
            const continueDialog = document.createElement('dialog');
            const continueBtn = document.createElement('button');
            continueBtn.textContent = (dialogClass === 'restart' ? "RESTART" : "AGAIN!");
            const winnerHeader = document.createElement('h1');
            winnerHeader.textContent = "Player " + winner + (dialogClass === 'restart' ? " wins it all!" : "wins!");
            
            continueDialog.classList.add(dialogClass + '-dialog');
            continueBtn.classList.add(dialogClass + '-button');
            body.appendChild(continueDialog);
            continueDialog.showModal();
            continueDialog.appendChild(winnerHeader);
            continueDialog.appendChild(continueBtn);
                
            continueDialog.addEventListener('cancel', (e) => {
                e.preventDefault();
            });

            continueDialog.addEventListener('click', (e) => {
                const target = e.target;
                if(target === continueBtn){
                    continueDialog.close();
                    playGame.roundReset();
                    body.removeChild(continueDialog);
                    playGame.computersTurnOnLoss();

                    if(dialogClass === 'restart'){
                        gameInitialize.scoreO = 0;
                        gameInitialize.scoreX = 0;
                        document.querySelector('.x-score').textContent = gameInitialize.scoreX;
                        document.querySelector('.o-score').textContent = gameInitialize.scoreO;
                        body.removeChild(continueDialog);
                        playGame.computersTurnOnLoss();
                    }

                } else {
                    return;
                }
            });
        },

        roundReset: function() {
            gridArray = ["", "", "", "", "", "", "", "", "",];
            gridBtn.forEach((button) => {
                button.textContent = "";
            });
            winnerFound = false;
        },
        
    };

    playGame.playersTurn();
    
})();