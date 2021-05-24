"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suits = ['♣️', '♦️', '♥️', '♠️'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];
// turn K, Q, J into the value of 10 and A into the value of 1
exports.turnKQJto10 = (card) => {
    let number = 0;
    if (numbers.indexOf(card[1]) < 8) {
        number = numbers.indexOf(card[1]) + 2;
    }
    else if (numbers.indexOf(card[1]) > 7 && numbers.indexOf(card[1]) < 11) {
        number = 10;
    }
    else if (numbers.indexOf(card[1]) === 11) {
        number = 1;
    }
    return number;
};
exports.printCard = (cardArray) => {
    return `${cardArray[1]} ${cardArray[0]}`;
};
// find the index of the biggest number out of three cards
exports.findTheBiggestNum = (cardA, cardB, cardC) => {
    if (cardC) {
        return Math.max(numbers.indexOf(cardA[1]), numbers.indexOf(cardB[1]), numbers.indexOf(cardC[1]));
    }
    else {
        return Math.max(numbers.indexOf(cardA[1]), numbers.indexOf(cardB[1]));
    }
};
