const gridBtn = document.querySelectorAll('.game-button');

(function() {
    let gridArray = ["", "", "", "", "", "", "", "", "",];
    let gameInitialize = {
        scoreX: 0,
        scoreO: 0,
        computerChoice: "",
        playerChoice: "",
        getPlayerSelection: function() {
            const body = document.querySelector('body');
            const selectionDialog = document.createElement('dialog');
            const xBtn = document.createElement('button');
            const oBtn = document.createElement('button');
            const introText = document.createElement('h1');
            introText.textContent = "Select your champion:";
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
    gameInitialize.getPlayerSelection();
    
    let winnerFound = false;
    let roundEndCheck = 0;
    let playGame = {
        playersTurn: function() {
            let gameGrid = document.querySelector('.game-grid');
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
                console.log(gridArray);
                return;
            } else if (gridArray.indexOf("") === -1){
                gridArray = ["", "", "", "", "", "", "", "", "",];
                gridBtn.forEach((button) => {
                    button.textContent = "";
                });
                return;
                // ADD THING TO DO WHEN THE GAME ENDS IN A TIE
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
            playGame.tieCheck();
        },

        tieCheck: function(){
            if (gridArray.indexOf("") === -1){
                gridArray = ["", "", "", "", "", "", "", "", "",];
                gridBtn.forEach((button) => {
                    button.textContent = "";
                });
                // ADD THING TO DO WHEN THE GAME ENDS IN A TIE
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
                    // ADD DIALOG SAYING WHO WON, AND TO CONTINUE
                } else if (winningCombinations.some(subArray => subArray.every(values => gridArray[values] === computer))) {
                    winnerFound = true;
                    winner = computer;
                    // ADD DIALOG SAYING WHO WON, AND TO CONTINUE
                };
                playGame.increaseScore(winner);
            };
        },

        increaseScore: function(winner) {
            if(winner === "X"){
                gameInitialize.scoreX++;
                document.querySelector('.x-score').textContent = gameInitialize.scoreX;
                setTimeout(() => {
                    if(gameInitialize.scoreX === 5){
                        if(gameInitialize.playerChoice === "X"){
                            alert("player wins");
                            // ADD BUTTON/DIALOG TO RESET GAME
                        } else {
                            alert("computer wins");
                            // ADD BUTTON/DIALOG TO RESET GAME
                        }
                    } else {
                        playGame.roundOver();
                    }
                }, 20)
            } else if (winner === "O") {
                gameInitialize.scoreO++;
                document.querySelector('.o-score').textContent = gameInitialize.scoreO;
                setTimeout(() => {
                    if(gameInitialize.scoreO === 5){
                        if(gameInitialize.playerChoice === "O"){
                            alert("player wins");
                            // ADD BUTTON/DIALOG TO RESET GAME
                        } else {
                            alert("computer wins");
                            // ADD BUTTON/DIALOG TO RESET GAME
                        }
                    } else {
                        playGame.roundOver();
                    }
                }, 20)
            }

        },

        roundOver: function() {
            setTimeout(() => {
                // alert("woohoo");
                playGame.resetRound();
            }, 20);
        },

        resetRound: function() {
            gridArray = ["", "", "", "", "", "", "", "", "",];
            gridBtn.forEach((button) => {
                button.textContent = "";
            });
            winnerFound = false;
        },
        
    };

    playGame.playersTurn();
    
})();