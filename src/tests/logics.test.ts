import {
  findBiggerSuit,
  findNumberScore,
  gameLogic,
  GameCards,
} from '../utils/logics'

import { findTheBiggestNum } from '../utils/helpers'

describe('The game should return the card with the bigger suit', () => {
  describe('With two cards', () => {
    test('with two different cards', () => {
      expect(findBiggerSuit(['♥️', '3'], ['♠️', '5'])).toBe('♠️')
    })
    test('with two cards with same number', () => {
      expect(findBiggerSuit(['♥️', '5'], ['♠️', '5'])).toBe('♠️')
    })
    test('test for svlete', () => {
      expect(findBiggerSuit(['♣️', '9'], ['♦️', 'Q'])).toBe('♦️')
    })
    test('test for svelte', () => {
      expect(findBiggerSuit(['♥️', '6'], ['♠️', '3'])).toBe('♥️')
    })
  })
  describe('With three cards', () => {
    test('with three cards with same numbers', () => {
      expect(findBiggerSuit(['♥️', '5'], ['♠️', '5'], ['♣️', '5'])).toBe('♠️')
    })
    test('with three different cards', () => {
      expect(findBiggerSuit(['♥️', 'K'], ['♠️', 'Q'], ['♣️', 'A'])).toBe('♣️')
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

describe('The game should return the number score of the two or three cards', () => {
  describe('With two cards', () => {
    test('Should return the score of the cards with no edge case', () => {
      expect(findNumberScore(['♠️', '3'], ['♣️', '9'])).toBe(2)
    })
    test('Should return 0 when the sum is 20', () => {
      expect(findNumberScore(['♠️', 'K'], ['♣️', 'Q'])).toBe(0)
    })
    test('Should return 0 when the sum is 10', () => {
      expect(findNumberScore(['♠️', '9'], ['♣️', 'A'])).toBe(0)
    })
  })
  describe('With three cards', () => {
    test('Should return the score of the three cards with no edge case', () => {
      expect(findNumberScore(['♥️', '2'], ['♥️', '7'], ['♠️', '7'])).toBe(6)
    })
    test('Should return 0 when the sum is 30', () => {
      expect(findNumberScore(['♥️', 'K'], ['♥️', 'Q'], ['♠️', 'J'])).toBe(0)
    })
  })
})

describe('should return the one with bigger number card', () => {
  test('should return user number card', () => {
    expect(findTheBiggestNum(['♣️', '9'],['♦️', 'Q'],undefined)).toBe(9)
  })
  test('should return bot number card', () => {
    expect(findTheBiggestNum(['♥️', '6'],['♠️', '3'],undefined)).toBe(4)
  })
})

describe('The game should return the winner', () => {
  test('the game with no edge cases', () => {
    const gameCards: GameCards = {
      userNum: 5,
      userSuit: '♦️',
      botNum: 9,
      botSuit: '♥️',
      userFirst: ['♥️', 'A'],
      userSecond: ['♥️', '4'],
      userThird: undefined,
      botThird: undefined,
      botFirst: ['♠️', '9'],
      botSecond: ['♠️', '4'],
    }
    expect(gameLogic(gameCards)).toBe('Bot')
  }),
  describe('when the scores are the same', () => {
    test('when both have two cards and user has bigger number', () => {
      const gameCards: GameCards = 
        {
          userNum: 9,
          userSuit: '♦️',
          botNum: 9,
          botSuit: '♥️',
          userFirst: ['♣️', '9'],
          userSecond: ['♦️', 'Q'],
          botFirst: ['♥️', '6'],
          botSecond: ['♠️', '3'],
          userThird: undefined,
        botThird: undefined,
        }
        expect(gameLogic(gameCards)).toBe('User')
    })
    test('when both have two cards and bot has bigger number', () => {
      const gameCards: GameCards = {
        userNum: 5,
        userSuit: '♥️',
        botNum: 5,
        botSuit: '♣️',
        botFirst: ['♣️', 'A'],
        botSecond: ['♥️', '4'],
        userFirst: ['♠️', '3'],
        userSecond: ['♠️', '2'],
        userThird: undefined,
        botThird: undefined,
      }
      expect(gameLogic(gameCards)).toBe('Bot')
    })
    test('when the user has only two cards and the bot has three', () => {
      const gameCards: GameCards = {
        userNum: 5,
        userSuit: '♥️',
        botNum: 5,
        botSuit: '♠️',
        userFirst: ['♥️', '2'],
        userSecond: ['♥️', '3'],
        botFirst: ['♠️', 'J'],
        userThird: undefined,
        botSecond: ['♠️', '4'],
        botThird: ['♥️', 'A'],
      }
      expect(gameLogic(gameCards)).toBe('User')
    })
    test('when the bot has only two cards and the user has three', () => {
      const gameCards: GameCards = {
        userNum: 5,
        userSuit: '♥️',
        botNum: 5,
        botSuit: '♠️',
        userFirst: ['♥️', '2'],
        userSecond: ['♥️', '3'],
        botFirst: ['♠️', 'J'],
        botThird: undefined,
        botSecond: ['♠️', '4'],
        userThird: ['♥️', 'A'],
      }
      expect(gameLogic(gameCards)).toBe('Bot')
    })
    test('when both have three cards the bot has bigger number card', () => {
      const gameCards: GameCards = {
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
      }
      expect(gameLogic(gameCards)).toBe('Bot')
    })
    test('when both have three cards and the user has bigger number card', () => {
      const gameCards: GameCards = {
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
      }
      expect(gameLogic(gameCards)).toBe('User')
    })
    test('when both have same biggest number cards and the user has bigger suit', () => {
      const gameCards: GameCards = {
        userNum: 7,
        userSuit: '♠️',
        botNum: 7,
        botSuit: '♥️',
        userFirst: ['♥️', '6'],
        userSecond: ['♥️', 'K'],
        userThird: ['♠️', 'A'],
        botFirst: ['♠️', '2'],
        botSecond: ['♠️', '4'],
        botThird: ['♥️', 'A'],
      }
      expect(gameLogic(gameCards)).toBe('User')
    })
    test('when both have same biggest number cards and the bot has bigger suit', () => {
      const gameCards: GameCards = {
        userNum: 7,
        userSuit: '♥️',
        botNum: 7,
        botSuit: '♠️',
        userFirst: ['♥️', '6'],
        userSecond: ['♥️', 'K'],
        userThird: ['♥️', 'A'],
        botFirst: ['♠️', '2'],
        botSecond: ['♠️', '4'],
        botThird: ['♠️', 'A'],
      }
      expect(gameLogic(gameCards)).toBe('Bot')
    })
  })
})
