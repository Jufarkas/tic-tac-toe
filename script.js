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
    let gameInitialize = {
        gridArray: ["", "", "", "", "", "", "", "", "",],
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
    console.log(gameInitialize.gridArray.length);

    let playGame = {
        clickWatcher: function() {          
            gridBtn.forEach(button => {
                button.addEventListener('click', (e) => {
                    let btnClasslist = e.target.classList;
                    let btnPosition = btnClasslist.item(1);
                    if(e.target.textContent === ""){
                        e.target.textContent = gameInitialize.playerChoice;
                        gameInitialize.gridArray[btnPosition] = gameInitialize.playerChoice;
                        console.log(gameInitialize.gridArray);
                    } else {
                        return;
                    }
                })
            })
        }
    }
    playGame.clickWatcher();
})();