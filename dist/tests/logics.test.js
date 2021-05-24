"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logics_1 = require("../utils/logics");
// const suits = ['♣️', '♦️', '♥️', '♠️']
// const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A']
describe('The game should return the card with the bigger suit', () => {
    describe('With two cards', () => {
        test('with two different cards', () => {
            expect(logics_1.findBiggerSuit(['♥️', '3'], ['♠️', '5'])).toBe('♠️');
        });
        test('with two cards with same number', () => {
            expect(logics_1.findBiggerSuit(['♥️', '5'], ['♠️', '5'])).toBe('♠️');
        });
    });
    describe('With three cards', () => {
        test('with three cards with same numbers', () => {
            expect(logics_1.findBiggerSuit(['♥️', '5'], ['♠️', '5'], ['♣️', '5'])).toBe('♠️');
        });
        test('with three different cards', () => {
            expect(logics_1.findBiggerSuit(['♥️', 'K'], ['♠️', 'Q'], ['♣️', 'A'])).toBe('♣️');
        });
        test('with first and second card with same number and the number is larger than the third', () => {
            expect(logics_1.findBiggerSuit(['♥️', '5'], ['♠️', '5'], ['♣️', '2'])).toBe('♠️');
        });
        test('with first and third card with same number and the number is larger than the second', () => {
            expect(logics_1.findBiggerSuit(['♥️', '5'], ['♥️', '4'], ['♠️', '5'])).toBe('♠️');
        });
        test('with second and third card with same number and the number is larger than the first', () => {
            expect(logics_1.findBiggerSuit(['♥️', '2'], ['♥️', '7'], ['♠️', '7'])).toBe('♠️');
        });
        test('with first and second card with same number but the number is smaller than the third', () => {
            expect(logics_1.findBiggerSuit(['♥️', '5'], ['♥️', '5'], ['♠️', '9'])).toBe('♠️');
        });
        test('with first and third card with same number and the number is smaller than the second', () => {
            expect(logics_1.findBiggerSuit(['♥️', '5'], ['♥️', 'A'], ['♠️', '5'])).toBe('♥️');
        });
        test('with second and third card with same number and the number is smaller than the first', () => {
            expect(logics_1.findBiggerSuit(['♥️', 'A'], ['♣️', '5'], ['♠️', '5'])).toBe('♥️');
        });
    });
});
describe('The game should return the number score of the two or three cards', () => {
    describe('With two cards', () => {
        test('Should return the score of the cards with no edge case', () => {
            expect(logics_1.findNumberScore(['♠️', '3'], ['♣️', '9'])).toBe(2);
        });
        test('Should return 0 when the sum is 20', () => {
            expect(logics_1.findNumberScore(['♠️', 'K'], ['♣️', 'Q'])).toBe(0);
        });
        test('Should return 0 when the sum is 10', () => {
            expect(logics_1.findNumberScore(['♠️', '9'], ['♣️', 'A'])).toBe(0);
        });
    });
    describe('With three cards', () => {
        test('Should return the score of the three cards with no edge case', () => {
            expect(logics_1.findNumberScore(['♥️', '2'], ['♥️', '7'], ['♠️', '7'])).toBe(6);
        });
        test('Should return 0 when the sum is 30', () => {
            expect(logics_1.findNumberScore(['♥️', 'K'], ['♥️', 'Q'], ['♠️', 'J'])).toBe(0);
        });
    });
});
describe('The game should return the winner', () => {
    test('the game with no edge cases', () => {
        const gameCards = {
            userNum: 5,
            userSuit: '♥️',
            botNum: 3,
            botSuit: '♠️',
            userFirst: ['♥️', 'A'],
            userSecond: ['♥️', '4'],
            botFirst: ['♠️', '9'],
            botSecond: ['♠️', '4'],
        };
        expect(logics_1.gameLogic(gameCards)).toBe('User');
    });
    test('when the number score is the same', () => {
        const gameCards = {
            userNum: 5,
            userSuit: '♥️',
            botNum: 5,
            botSuit: '♠️',
            userFirst: ['A', '♥️'],
            userSecond: ['4', '♥️'],
            botFirst: ['3', '♠️'],
            botSecond: ['2', '♠️'],
        };
        expect(logics_1.gameLogic(gameCards)).toBe('Bot');
    });
    describe('when the scores are the same', () => {
        test('when the bot has bigger number card', () => {
            const gameCards = {
                userNum: 5,
                userSuit: '♥️',
                botNum: 5,
                botSuit: '♥️',
                userFirst: ['♥️', '2'],
                userSecond: ['♥️', '3'],
                userThird: ['♥️', 'Q'],
                botFirst: ['♠️', 'J'],
                botSecond: ['♠️', '4'],
                botThird: ['♥️', 'A'],
            };
            expect(logics_1.gameLogic(gameCards)).toBe('Bot');
        });
        test('when the user has bigger number card', () => {
            const gameCards = {
                userNum: 7,
                userSuit: '♥️',
                botNum: 7,
                botSuit: '♥️',
                userFirst: ['♥️', '6'],
                userSecond: ['♥️', 'K'],
                userThird: ['♥️', 'A'],
                botFirst: ['♠️', '3'],
                botSecond: ['♠️', '4'],
                botThird: ['♥️', 'J'],
            };
            expect(logics_1.gameLogic(gameCards)).toBe('User');
        });
    });
});
