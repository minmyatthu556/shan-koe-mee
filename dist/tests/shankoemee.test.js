"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../utils/helpers");
const suits = ['♣️', '♦️', '♥️', '♠️'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];
describe('The game returns the card with the bigger suit', () => {
    test('return the suit of the bigger numbere if two different cards are given', () => {
        expect(helpers_1.findBiggerSuit(['♥️', '5'], ['♠️', '3'])).toBe('♥️');
    });
    test('return the bigger suit when given two cards with same number', () => {
        expect(helpers_1.findBiggerSuit(['♥️', '5'], ['♠️', '5'])).toBe('♠️');
    });
});
