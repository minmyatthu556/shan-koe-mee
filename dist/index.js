"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require('inquirer');
const helpers_1 = require("./utils/helpers");
const logics_1 = require("./utils/logics");
const suits = ['♣️', '♦️', '♥️', '♠️'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];
let deck = helpers_1.buildADeck();
// function to return a random card from deck and remove that card from deck
const drawACard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const chosenCard = deck[randomIndex];
    deck = deck.filter((card) => card !== chosenCard);
    return chosenCard;
};
// gameplay
const playGame = () => {
    const userFirstCard = drawACard();
    const botFirstCard = drawACard();
    const userSecondCard = drawACard();
    const botSecondCard = drawACard();
    let botDrawCard;
    let userDrawCard;
    let userSuitScore = logics_1.findBiggerSuit(userFirstCard, userSecondCard);
    let botSuitScore = logics_1.findBiggerSuit(botFirstCard, botSecondCard);
    let userNumScore = logics_1.findNumberScore(userFirstCard, userSecondCard);
    let botNumScore = logics_1.findNumberScore(botFirstCard, botSecondCard);
    if (botNumScore < 5) {
        botDrawCard = drawACard();
        botSuitScore = logics_1.findBiggerSuit(botFirstCard, botSecondCard, botDrawCard);
        botNumScore = logics_1.findNumberScore(botFirstCard, botSecondCard, botDrawCard);
    }
    console.log('🃏 Welcome To Shan-Koe-Mee 🃏');
    setTimeout(() => {
        console.log(`\nUser first card is ${helpers_1.printCard(userFirstCard)}`);
        console.log(`User second card is ${helpers_1.printCard(userSecondCard)}`);
        console.log(`User current score: Suits: ${userSuitScore}  and Number: ${userNumScore}\n`);
    }, 1000);
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
                userDrawCard = drawACard();
                userSuitScore = logics_1.findBiggerSuit(userFirstCard, userSecondCard, userDrawCard);
                userNumScore = logics_1.findNumberScore(userFirstCard, userSecondCard, userDrawCard);
            }
            console.log(`\n${userDrawCard ? `User drew ${helpers_1.printCard(userDrawCard)}` : ''}`);
            console.log(`User score: Suits: ${userSuitScore}  and Number: ${userNumScore}\n`);
            const gameCards = {
                userNum: Number(userNumScore),
                userSuit: userSuitScore,
                botNum: Number(botNumScore),
                botSuit: botSuitScore,
                userFirst: userFirstCard,
                userSecond: userSecondCard,
                userThird: userDrawCard,
                botFirst: botFirstCard,
                botSecond: botSecondCard,
                botThird: botDrawCard,
            };
            const winner = logics_1.gameLogic(gameCards);
            console.log(`Bot cards are: ${helpers_1.printCard(botFirstCard)} ${botDrawCard ? ' ,' : ' and'} ${helpers_1.printCard(botSecondCard)} ${botDrawCard ? ` and ${helpers_1.printCard(botDrawCard)}` : ''}`);
            console.log(`Bot score: Suits: ${botSuitScore}  and Number: ${botNumScore}\n`);
            if (winner === 'User') {
                console.log('🍾CONGRATULATIONS🍾\nYou Win This Round 🎊\n');
            }
            else {
                console.log('Sorry 😞 bot wins this round. Good luck next time 🍀\n');
            }
        });
    }, 2000);
};
playGame();
