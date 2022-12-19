(() => {
    "use strict"
    //HTML REFERENCES

    const btnGetCard = document.querySelector("#btnGetCard"),
        btnStop = document.querySelector("#btnStop"),
        btnNewGame = document.querySelector("#btnNewGame"),
        scoreboard = document.querySelectorAll("#score"),
        playerCards = document.querySelectorAll("#player-cards");

    //Logic Game

    const types = ["C", "D", "H", "D"],
          others = ["A", "J", "Q", "K"];
    
    let scorePlayers = [0, 0],
        deck,
        inGame = 0;

    //Player in Game
    const startgame = () => {
        inGame = 0;
        deck = newDeck();
        disabledButtons(false);
    }
    

    const newDeck = () => {
        const newDeck = [];
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                newDeck.push(`${i}${type}`)
            }
        }

        for (let type of types) {
            for (let other of others) {
                newDeck.push(`${other}${type}`)
            }
        }
        return _.shuffle(newDeck);
    }
    const disabledButtons = (status) => {
        btnGetCard.disabled = status;
        btnStop.disabled = status;
        btnNewGame.disabled = !status;
    }

    const resetScore = () => {
        scorePlayers = scorePlayers.map(player => 0);
        scoreboard.forEach(small => small.innerText = 0);
    }

    const getCard = () => deck.pop();

    const valueA = () => {
        let A;
        do A = prompt("11 or 1?")
        while (A != "11" && A != "1");
        return parseInt(A);
    }

    const valueCard = card => {
        if (card[0] == "A") return valueA();
        if (others.includes(card[0]) || card[0] == "1") return 10;
        return parseInt(card[0]);
    };

    const increaseScore = (player, newScore) => {
        scorePlayers[player] += newScore;
        scoreboard[player].innerText = scorePlayers[player];
    }

    const winmessage = () => {
        if (scorePlayers[0] == scorePlayers[1]) (alert("Draw!"))
        else scorePlayers[0] > scorePlayers[1] ? alert("Player 1 Wins!") : alert("Player2 Wins!");
    }

    //EVENTS
    btnNewGame.addEventListener("click", () => {
        startgame();
        deck = newDeck();
        disabledButtons(false);
        resetScore();
        inGame = 0;
        playerCards[0].innerHTML = "";
        playerCards[1].innerHTML = "";
    })

    btnGetCard.addEventListener("click", () => {
        const card = getCard();
        const newScore = valueCard(card);;
        increaseScore(inGame, newScore);
        const imgCard = document.createElement("img");
        imgCard.classList.add("card")
        imgCard.src = `assets/cards/${card}.png`;
        playerCards[inGame].append(imgCard);

        if (scorePlayers[inGame] > 21) {
            alert(`Player ${inGame + 1} missing!`)
            disabledButtons(true);
        }
    })

    btnStop.addEventListener("click", () => {
        if (inGame == 1) {
            if (scorePlayers[1] < scorePlayers[0]) alert("Your score must be higher!");
            else {
                winmessage();
                disabledButtons(true);
            }
        } else {
            alert("it's time Player 2!")
            inGame++;
        }
    })

    disabledButtons(true);
})()