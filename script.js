// (function(){
//     let newGame = {
//         score: 0,
//         greeting: function() {
//             console.log("hello there");
//         },
//         increase: function() {
//             this.score += 1;
//             console.log(this.score);
//         },
//     }
//     newGame.greeting();
//     newGame.increase();
//     newGame.increase();
//     newGame.increase();
//     newGame.increase();
//     newGame.increase();
// })();


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
    let playGame = {
        clickWatcher: function() {   
            let gameGrid = document.querySelector('.game-grid');
            gameGrid.addEventListener('click', (e) => { // listen to grid container, instead of individual buttons
                if (e.target.matches('.game-button')) { 
                // checks if elem clicked inside the container has the class 'game-button'
                    let btnClasslist = e.target.classList; // grabs the second class, which are numbers for their 'positions'
                    let btnPosition = btnClasslist.item(1); // assigns the button position to matching array[#]
                    if (gridArray[btnPosition] === "" && winnerFound === false) {
                        e.target.textContent = gameInitialize.playerChoice;
                        gridArray[btnPosition] = gameInitialize.playerChoice;
                        setTimeout(playGame.checkWinner, 20);
                    } else {
                        return;
                    }
                    setTimeout(playGame.computersTurn, 30);
                }
            });
        },

        computersTurn: function() {
            if (winnerFound === true) {
                return;
            }
            let computerGenerator = Math.floor(Math.random() * 9);
            let compGridBtn = document.querySelector('.game-grid button:nth-child('+ (computerGenerator +1) +')'); // gets the button for the grid from its class
            if (gridArray.indexOf("") === -1){
                alert("tie!");
                return;
            } else if (gridArray[computerGenerator] != ""){  // need to add an '&& / ||' here to stop from looping if the game ends in a tie
                computerGenerator = Math.floor(Math.random() * 9);
                setTimeout(playGame.computersTurn, 30);
            } else if (gridArray[computerGenerator] === ""){
                compGridBtn.textContent = gameInitialize.computerChoice;
                gridArray[computerGenerator] = gameInitialize.computerChoice;
                setTimeout(playGame.checkWinner, 20);
                computerGenerator = Math.floor(Math.random() * 9);
            } else {
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
                } else if (winningCombinations.some(subArray => subArray.every(values => gridArray[values] === computer))) {
                    winnerFound = true;
                    winner = computer;
                }
                playGame.increaseScore(winner);
            }
        },

        increaseScore: function(winner) {
            if(winner === "X"){
                gameInitialize.scoreX++;
                console.log(gameInitialize.scoreX);
                document.querySelector('.x-score').textContent = gameInitialize.scoreX;
            } else if (winner === "O") {
                gameInitialize.scoreO++;
                console.log(gameInitialize.scoreO);
                document.querySelector('.o-score').textContent = gameInitialize.scoreO;
            }
        }
    };

    playGame.clickWatcher();
    
})();


// X,,,,X,,,,X - top left -> btm right 0, 4, 8
// ,,X,,X,,X,, - top right -> btm left 2, 4, 6

// X,X,X,,,,,, - top row horiz 0, 1, 2
// ,,,X,X,X,,, - mid row horiz 3, 4, 5
// ,,,,,,X,X,X - btm row horiz 6, 7, 8

// X,,,X,,,X,, - 1st column vert 0, 3, 6
// ,X,,,X,,,X, - 2nd column vert 1, 4, 7
// ,,X,,,X,,,X - 3rd column vert 2, 5, 8