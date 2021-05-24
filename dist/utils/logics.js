"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const suits = ['♣️', '♦️', '♥️', '♠️'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];
exports.findBiggerSuit = (firstCard, secondCard, thirdCard = null) => {
    if (!thirdCard) {
        if (firstCard[1] !== secondCard[1]) {
            const cardWithBiggerNum = numbers.indexOf(firstCard[1]) > numbers.indexOf(secondCard[1])
                ? firstCard
                : secondCard;
            return cardWithBiggerNum[0];
        }
        else {
            if (suits.indexOf(firstCard[0]) > suits.indexOf(secondCard[0])) {
                return firstCard[0];
            }
            else {
                return secondCard[0];
            }
        }
    } /* when the third card exists */
    else {
        /* if three cards have same number */
        if (firstCard[1] === secondCard[1] && firstCard[1] === thirdCard[1]) {
            const max = Math.max(suits.indexOf(firstCard[0]), suits.indexOf(secondCard[0]), suits.indexOf(thirdCard[0]));
            if (max === suits.indexOf(firstCard[0])) {
                return firstCard[0];
            }
            else if (max === suits.indexOf(secondCard[0])) {
                return secondCard[0];
            }
            else {
                return thirdCard[0];
            }
        } /* if two cards have same number */
        else if (firstCard[1] === secondCard[1] &&
            numbers.indexOf(thirdCard[1]) < numbers.indexOf(secondCard[1])) {
            if (suits.indexOf(firstCard[0]) > suits.indexOf(secondCard[0])) {
                return firstCard[0];
            }
            else {
                return secondCard[0];
            }
        }
        else if (firstCard[1] === thirdCard[1] &&
            numbers.indexOf(secondCard[1]) < numbers.indexOf(firstCard[1])) {
            if (suits.indexOf(firstCard[0]) > suits.indexOf(thirdCard[0])) {
                return firstCard[0];
            }
            else {
                return thirdCard[0];
            }
        }
        else if (secondCard[1] === thirdCard[1] &&
            numbers.indexOf(firstCard[1]) < numbers.indexOf(secondCard[1])) {
            if (suits.indexOf(secondCard[0]) > suits.indexOf(thirdCard[0])) {
                return secondCard[0];
            }
            else {
                return thirdCard[0];
            }
        }
        else {
            const max = Math.max(numbers.indexOf(firstCard[1]), numbers.indexOf(secondCard[1]), numbers.indexOf(thirdCard[1]));
            if (max === numbers.indexOf(firstCard[1])) {
                return firstCard[0];
            }
            else if (max === numbers.indexOf(secondCard[1])) {
                return secondCard[0];
            }
            else {
                return thirdCard[0];
            }
        }
    }
};
// find the score of the number of the cards
exports.findNumberScore = (firstCard, secondCard, thirdCard = null) => {
    let numA;
    let numB;
    let numC = 0;
    numA = helpers_1.turnKQJto10(firstCard);
    numB = helpers_1.turnKQJto10(secondCard);
    if (thirdCard) {
        numC = helpers_1.turnKQJto10(thirdCard);
    }
    let sum = numA + numB + numC;
    if (sum === 30) {
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
