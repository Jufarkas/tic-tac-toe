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

(function(){
    const body = document.querySelector('body');
    const mainDoc = document.querySelector('.master-container');
    const playerSelection = document.createElement('dialog');
    let gridTracker = ["", "", "", "", "", "", "", "", "",];
    let gameStart = {
        playerChoice: "",
        showGrid: function() {
            mainDoc.classList.remove('off');
        },
        playerSelection: function() {
            const xBtn = document.createElement('button');
            const oBtn = document.createElement('button');
            const introText = document.createElement('h1');
            introText.textContent = "Select your champion:"
            xBtn.textContent = "X";
            oBtn.textContent = "O"
            body.appendChild(playerSelection);
            playerSelection.showModal();
            playerSelection.appendChild(introText);
            playerSelection.appendChild(xBtn).classList.add('x-button');
            playerSelection.appendChild(oBtn).classList.add('o-button');
            playerSelection.addEventListener('click', (e) => {
                const target = e.target;
                if(target === xBtn){
                    this.playerChoice = "X";
                    playerSelection.close();
                    console.log(this.playerChoice);
                    gameStart.showGrid();
                } else if (target === oBtn){
                    this.playerChoice = "O";
                    playerSelection.close();
                    console.log(this.playerChoice);
                    gameStart.showGrid();
                }
            })
        },
    }
    gameStart.playerSelection();
    console.log(gridTracker.length);
})();

