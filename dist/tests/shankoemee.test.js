"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logics_1 = require("../utils/logics");
// const suits = ['♣️', '♦️', '♥️', '♠️']
// const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A']
describe('The game returns the card with the bigger suit', () => {
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
describe('The game returns the number score of the two or three cards', () => {
    describe('With two cards', () => {
        test('returns the score of the cards with no edge case', () => {
            expect(logics_1.findNumberScore(['♠️', '3'], ['♣️', '9'])).toBe(2);
        });
        test('returns 0 when the sum is 20', () => {
            expect(logics_1.findNumberScore(['♠️', 'K'], ['♣️', 'Q'])).toBe(0);
        });
        test('returns 0 when the sum is 10', () => {
            expect(logics_1.findNumberScore(['♠️', '9'], ['♣️', 'A'])).toBe(0);
        });
    });
    describe('With three cards', () => {
        test('returns the score of the three cards with no edge case', () => {
            expect(logics_1.findNumberScore(['♥️', '2'], ['♥️', '7'], ['♠️', '7'])).toBe(6);
        });
        test('returns 0 when the sum is 30', () => {
            expect(logics_1.findNumberScore(['♥️', 'K'], ['♥️', 'Q'], ['♠️', 'J'])).toBe(0);
        });
    });
});
