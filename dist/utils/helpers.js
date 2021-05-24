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
exports.findBiggerSuit = (firstCard, secondCard, thirdCard = null) => {
    if (!thirdCard) {
        if (firstCard[1] !== secondCard[1]) {
            const cardWithBiggerNum = numbers.indexOf(firstCard[1]) > numbers.indexOf(secondCard[1]) ? firstCard : secondCard;
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
};
