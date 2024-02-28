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

const mainDoc = document.querySelector('.master-container');
const gridBtn = document.querySelectorAll('.game-button');

(function() {
    let gridArray = ["", "", "", "", "", "", "", "", "",];
    let gameInitialize = {
        computerChoice: "",
        playerChoice: "",
        showGrid: function() {
            mainDoc.classList.remove('off');
        },
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
                // NEED TO RE-WRITE THIS SO THAT ONE CLICK MAKES: 
                // playerChoice = "this.value(?)"
                // if (playerChoice = X) {compChoice = O} || vice versa
                const target = e.target;
                if(target === xBtn){
                    this.playerChoice = "X";
                    this.computerChoice = "O";
                    selectionDialog.close();
                    console.log("player choice is: " + this.playerChoice); //remove once complete
                    console.log("computer choice is: " + this.computerChoice); //remove once complete
                    gameInitialize.showGrid();
                } else if (target === oBtn){
                    this.playerChoice = "O";
                    this.computerChoice = "X";
                    selectionDialog.close();
                    console.log("player choice is: " + this.playerChoice); //remove once complete
                    console.log("computer choice is: " + this.computerChoice); //remove once complete
                    gameInitialize.showGrid();
                }
            });
        },
    }
    gameInitialize.getPlayerSelection();
    console.log(gridArray.length);

    let playGame = {
        clickWatcher: function() {   
            let gameGrid = document.querySelector('.game-grid');
            gameGrid.addEventListener('click', (e) => { // add event listener to grid container, instead of individual buttons
                if (e.target.matches('.game-button')) { // checks if the element clicked inside the grid container has the class 'game-button'
                    let btnClasslist = e.target.classList; // grabs the second class from the buttons, which are numbers for their 'positions'
                    let btnPosition = btnClasslist.item(1); // assigns the button position to matching array[#]
                    if (e.target.textContent === "") {
                        e.target.textContent = gameInitialize.playerChoice;
                        gridArray[btnPosition] = gameInitialize.playerChoice;
                        console.log(gridArray.toString());
                        setTimeout(playGame.checkWinner, 50);
                    } else {
                        return;
                    }
                }
            });
        },
        checkWinner: function() {
            const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] ];           // Diagonals
            let pc = gameInitialize.playerChoice;
            // below checks sub-arrays in 'winningCombinations' against gridArray w/ all values matching player/comp letter (have to do comp piece still)
            if (winningCombinations.some(subArray => subArray.every(values => gridArray[values] === pc))) {
                    alert("winner");
                    console.log(gridArray.toString());
            }
        },
    }
    playGame.clickWatcher();
    
})();


// make computer choice = random number between 0-8

// if (gameInitialize.gridArray[cmpPosition] != "")

// re-run randomizer and try again? (gotta be a more efficient way)

// else if (gameInitialize.gridArray[cmpPosition] = "")

// assign to grid


// X,,,,X,,,,X - top left -> btm right 0, 4, 8
// ,,X,,X,,X,, - top right -> btm left 2, 4, 6

// X,X,X,,,,,, - top row horiz 0, 1, 2
// ,,,X,X,X,,, - mid row horiz 3, 4, 5
// ,,,,,,X,X,X - btm row horiz 6, 7, 8

// X,,,X,,,X,, - 1st column vert 0, 3, 6
// ,X,,,X,,,X, - 2nd column vert 1, 4, 7
// ,,X,,,X,,,X - 3rd column vert 2, 5, 8