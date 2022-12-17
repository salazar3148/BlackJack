//HTML REFERENCES

const btnGetCard = document.querySelector("#btnGetCard");
const btnStop = document.querySelector("#btnStop");
const btnNewGame = document.querySelector("#btnNewGame");
const scoreboard = document.querySelectorAll("#score");
const playerCards = document.querySelectorAll("#player-cards"); 

//Logic Game

let player1 = {name: "Player1", score: 0, pos: 0};
let player2 = {name: "Player2", score: 0, pos: 1};
btnNewGame.disabled = true;

//Player in Game
let inGame = player1;

let types = ["C", "D", "H", "D"];
let others = ["A", "J", "Q", "K"];

const newDeck = () => {
    let newDeck = [];
    for(let i = 2; i <= 10; i++){
        for(let type of types){
            newDeck.push(`${i}${type}`)
        }
    }

    for(let type of types){
        for(let other of others){
            newDeck.push(`${other}${type}`)
        }
    }
    newDeck = _.shuffle(newDeck);
    return newDeck;
}

const disabledButtons = (status) => {
    btnGetCard.disabled = status;
    btnStop.disabled = status;
    btnNewGame.disabled = !status;
}

deck = newDeck();

const getCard = () => deck.pop(); 

const valueA = () => {
    let A;
    do A = prompt("11 or 1?") 
    while(A != "11" && A != "1");
    return parseInt(A);
}

const valueCard = card => {
    console.log(card);
    if(card[0] == "A") return valueA();
    if(others.includes(card[0]) || card[0] == "1") return 10;
    return parseInt(card[0]);
};

const setScore = (player, newScore) => {
    player.score = newScore;
    scoreboard[player.pos].innerText = player.score;
}

const winmessage = () => {
    if(player1.score == player2.score) (alert("Draw!"))
    player1.score > player2.score ? alert("Player 1 Wins!"): alert("Player2 Wins!");
}

//EVENTS
btnNewGame.addEventListener("click", () => {
    deck = newDeck();
    btnNewGame.disabled = true;
    disabledButtons(false);
    setScore(player1, 0);
    setScore(player2, 0);
    inGame = player1;
    playerCards[0].innerHTML = "";
    playerCards[1].innerHTML = "";
})

btnGetCard.addEventListener("click", () => {
    const card = getCard();
    const newScore = valueCard(card);;
    setScore(inGame, newScore + inGame.score);
    const imgCard = document.createElement("img");
    imgCard.classList.add("card")
    imgCard.src = `assets/cards/${card}.png`;
    playerCards[inGame['pos']].append(imgCard);

    if(inGame.score > 21){
        alert(`${inGame.name} missing!`)
        disabledButtons(true);
    }
})

btnStop.addEventListener("click", () => {
    if(inGame == player2) {
        if(player2.score < player1.score) alert("Your score must be higher!");
        else {
            winmessage();
            disabledButtons(true);
        }
    } else {
        alert("it's time Player 2!")
        inGame = player2;
    }
})