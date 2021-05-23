"use strict";
const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
const numbers = ['A', 'K', 'Q', 'J', '2', '3', '4', '5', '6', '7', '8', '9'];
// function to build a deck of cards (eg. [spades, A])
const buildADeck = () => {
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            deck.push([suits[i], numbers[j]]);
        }
    }
    return deck;
};
let deck = buildADeck();
console.log(deck);
const generateRandomNumber = (num) => {
    return Math.floor(Math.random() * num);
};
const drawACard = () => {
    const randomIndex = generateRandomNumber(48);
    const chosenCard = deck[randomIndex];
    deck = deck.filter(card => card !== chosenCard);
    return chosenCard;
};
const chosenCard = drawACard();
console.log(deck);
console.log(chosenCard);
