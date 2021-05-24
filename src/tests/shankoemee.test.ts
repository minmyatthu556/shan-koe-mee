import { findBiggerSuit, findNumberScore } from '../utils/logics'

// const suits = ['♣️', '♦️', '♥️', '♠️']
// const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A']

describe('The game returns the card with the bigger suit', () => {
  describe('With two cards', () => {
    test('with two different cards', () => {
      expect(findBiggerSuit(['♥️', '3'], ['♠️', '5'])).toBe('♠️')
    })
    test('with two cards with same number', () => {
      expect(findBiggerSuit(['♥️', '5'], ['♠️', '5'])).toBe('♠️')
    })
  })
  describe('With three cards', () => {
    test('with three cards with same numbers', () => {
      expect(findBiggerSuit(['♥️', '5'], ['♠️', '5'], ['♣️', '5'])).toBe('♠️')
    })
    test('with three different cards', () => {
      expect(findBiggerSuit(['♥️', '5'], ['♠️', '3'], ['♣️', '9'])).toBe('♣️')
    })
    test('with first and second card with same number and the number is larger than the third', () => {
      expect(findBiggerSuit(['♥️', '5'], ['♠️', '5'], ['♣️', '2'])).toBe('♠️')
    })
    test('with first and third card with same number and the number is larger than the second', () => {
      expect(findBiggerSuit(['♥️', '5'], ['♥️', '4'], ['♠️', '5'])).toBe('♠️')
    })
    test('with second and third card with same number and the number is larger than the first', () => {
      expect(findBiggerSuit(['♥️', '2'], ['♥️', '7'], ['♠️', '7'])).toBe('♠️')
    })
    test('with first and second card with same number but the number is smaller than the third', () => {
      expect(findBiggerSuit(['♥️', '5'], ['♥️', '5'], ['♠️', '9'])).toBe('♠️')
    })
    test('with first and third card with same number and the number is smaller than the second', () => {
      expect(findBiggerSuit(['♥️', '5'], ['♥️', 'A'], ['♠️', '5'])).toBe('♥️')
    })
    test('with second and third card with same number and the number is smaller than the first', () => {
      expect(findBiggerSuit(['♥️', 'A'], ['♣️', '5'], ['♠️', '5'])).toBe('♥️')
    })
  })
  
})
