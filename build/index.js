"use strict";
const inquirer = require('inquirer');
const suits = ['Clubs ♣', 'Diamonds ♦', 'Hearts ♥', 'Spades ♠️'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];
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
// function to generate random number from 0 to assigned parameter
const generateRandomNumber = (num) => {
    return Math.floor(Math.random() * num);
};
// function to return a random card from deck and remove that card from deck
const drawACard = (num) => {
    const randomIndex = generateRandomNumber(num);
    const chosenCard = deck[randomIndex];
    deck = deck.filter((card) => card !== chosenCard);
    return chosenCard;
};
// turn K, Q, J into the value of 10 and A into the value of 1
const turnKQJto10 = (array) => {
    let number = 0;
    if (numbers.indexOf(array[1]) < 8) {
        number = numbers.indexOf(array[1]) + 2;
    }
    else if (numbers.indexOf(array[1]) > 7 && numbers.indexOf(array[1]) < 11) {
        number = 10;
    }
    else if (numbers.indexOf(array[1]) === 11) {
        number = 1;
    }
    return number;
};
// find the suit of the card with bigger number
const findBiggerSuit = (arrayA, arrayB, arrayC = null) => {
    if (!arrayC) {
        const cardWithBiggerNum = numbers.indexOf(arrayA[1]) > numbers.indexOf(arrayB[1]) ? arrayA : arrayB;
        return cardWithBiggerNum[0];
    }
    else {
        const max = Math.max(numbers.indexOf(arrayA[1]), numbers.indexOf(arrayB[1]), numbers.indexOf(arrayC[1]));
        if (max === numbers.indexOf(arrayA[1])) {
            return arrayA[0];
        }
        else if (max === numbers.indexOf(arrayB[1])) {
            return arrayB[0];
        }
        else {
            return arrayC[0];
        }
    }
};
// find the score of the number of the two cards
const findNumberScore = (arrayA, arrayB, arrayC = null) => {
    let numA;
    let numB;
    let numC = 0;
    numA = turnKQJto10(arrayA);
    numB = turnKQJto10(arrayB);
    if (arrayC) {
        numC = turnKQJto10(arrayC);
    }
    let sum = numA + numB + numC;
    if (sum === 20 || sum === 30) {
        sum = 0;
    }
    else if (sum > 19) {
        sum -= 20;
    }
    else if (sum > 9 && sum < 20) {
        sum -= 10;
    }
    return sum;
};
// decide the winner
const gameLogic = (gameCards) => {
    let winner = '';
    const { userNum, botNum, userSuit, botSuit } = gameCards;
    if ((userNum === 8 || userNum === 9) && botNum < 8) {
        winner = 'User';
    }
    else if ((botNum === 8 || botNum === 9) && userNum < 8) {
        winner = 'Bot';
    }
    else if (userNum > botNum) {
        winner = 'User';
    }
    else if (botNum > userNum) {
        winner = 'Bot';
    }
    else if (userNum === botNum) {
        if (suits.indexOf(gameCards.userSuit) > suits.indexOf(gameCards.botSuit)) {
            winner = 'User';
        }
        else if (suits.indexOf(gameCards.botSuit) > suits.indexOf(gameCards.userSuit)) {
            winner = 'Bot';
        }
    }
    return winner;
};
// gameplay
const playGame = () => {
    const userFirstCard = drawACard(48);
    const userSecondCard = drawACard(47);
    const botFirstCard = drawACard(46);
    const botSecondCard = drawACard(45);
    let botDrawCard;
    let userDrawCard;
    let userSuitScore = findBiggerSuit(userFirstCard, userSecondCard);
    let botSuitScore = findBiggerSuit(botFirstCard, botSecondCard);
    let userNumScore = findNumberScore(userFirstCard, userSecondCard);
    let botNumScore = findNumberScore(botFirstCard, botSecondCard);
    if (botNumScore < 5) {
        botDrawCard = drawACard(44);
        botSuitScore = findBiggerSuit(botFirstCard, botSecondCard, botDrawCard);
        botNumScore = findNumberScore(botFirstCard, botSecondCard, botDrawCard);
    }
    console.log(`\nUser first card is ${userFirstCard[0]} of ${userFirstCard[1]}`);
    console.log(`User second card is ${userSecondCard[0]} of ${userSecondCard[1]}`);
    console.log(`User current score: Suits: ${userSuitScore} and ${userNumScore}`);
    setTimeout(() => {
        inquirer
            .prompt([
            {
                type: 'list',
                message: 'Do you want to draw a card?',
                name: 'response',
                choices: ['yes', 'no'],
            },
        ])
            .then((answer) => {
            if (answer.response === 'yes') {
                userDrawCard = drawACard(43);
                userSuitScore = findBiggerSuit(userFirstCard, userSecondCard, userDrawCard);
                userNumScore = findNumberScore(userFirstCard, userSecondCard, userDrawCard);
            }
            console.log(`${userDrawCard ? `User drew ${userDrawCard[0]} of ${userDrawCard[1]}` : ""}`);
            console.log(`User score: Suits: ${userSuitScore} and ${userNumScore}`);
            const gameCards = {
                userNum: Number(userNumScore),
                userSuit: userSuitScore,
                botNum: Number(botNumScore),
                botSuit: botSuitScore
            };
            const winner = gameLogic(gameCards);
            console.log(`Bot cards are: ${botFirstCard[0]} of ${botFirstCard[1]}, ${botSecondCard[0]} of ${botSecondCard[1]} ${botDrawCard ? `, ${botDrawCard[0]} of ${botDrawCard[1]}` : ''}`);
            console.log(`Bot score: Suits: ${botSuitScore} and ${botNumScore}`);
            console.log('Winner: ', winner);
        });
    }, 1000);
};
playGame();
