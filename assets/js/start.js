
let player1 = [];
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

//const getCard = deck => deck.pop(); 

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


player1 = newDeck();
card = getCard(player1);
console.log(valueCard(card));

//EVENTOS