import { turnKQJto10, findTheBiggestNum } from './helpers'

const suits = ['♣️', '♦️', '♥️', '♠️']
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A']

// find the suit of the card with largest number
export const findBiggerSuit = (
  firstCard: string[],
  secondCard: string[],
  thirdCard: string[] | null = null
): string => {
  if (!thirdCard) {
    if (firstCard[1] !== secondCard[1]) {
      const cardWithBiggerNum =
        numbers.indexOf(firstCard[1]) > numbers.indexOf(secondCard[1])
          ? firstCard
          : secondCard
      return cardWithBiggerNum[0]
    } else {
      if (suits.indexOf(firstCard[0]) > suits.indexOf(secondCard[0])) {
        return firstCard[0]
      } else {
        return secondCard[0]
      }
    }
  } /* when the third card exists */ else {
    /* if three cards have same number */
    if (firstCard[1] === secondCard[1] && firstCard[1] === thirdCard[1]) {
      const max = Math.max(
        suits.indexOf(firstCard[0]),
        suits.indexOf(secondCard[0]),
        suits.indexOf(thirdCard[0])
      )
      if (max === suits.indexOf(firstCard[0])) {
        return firstCard[0]
      } else if (max === suits.indexOf(secondCard[0])) {
        return secondCard[0]
      } else {
        return thirdCard[0]
      }
    } /* if two cards have same number */ else if (
      firstCard[1] === secondCard[1] &&
      numbers.indexOf(thirdCard[1]) < numbers.indexOf(secondCard[1])
    ) {
      if (suits.indexOf(firstCard[0]) > suits.indexOf(secondCard[0])) {
        return firstCard[0]
      } else {
        return secondCard[0]
      }
    } else if (
      firstCard[1] === thirdCard[1] &&
      numbers.indexOf(secondCard[1]) < numbers.indexOf(firstCard[1])
    ) {
      if (suits.indexOf(firstCard[0]) > suits.indexOf(thirdCard[0])) {
        return firstCard[0]
      } else {
        return thirdCard[0]
      }
    } else if (
      secondCard[1] === thirdCard[1] &&
      numbers.indexOf(firstCard[1]) < numbers.indexOf(secondCard[1])
    ) {
      if (suits.indexOf(secondCard[0]) > suits.indexOf(thirdCard[0])) {
        return secondCard[0]
      } else {
        return thirdCard[0]
      }
    } else {
      const max = Math.max(
        numbers.indexOf(firstCard[1]),
        numbers.indexOf(secondCard[1]),
        numbers.indexOf(thirdCard[1])
      )
      if (max === numbers.indexOf(firstCard[1])) {
        return firstCard[0]
      } else if (max === numbers.indexOf(secondCard[1])) {
        return secondCard[0]
      } else {
        return thirdCard[0]
      }
    }
  }
}

// find the score of the number of the cards
export const findNumberScore = (
  firstCard: string[],
  secondCard: string[],
  thirdCard: string[] | null = null
): number => {
  let numA: number
  let numB: number
  let numC = 0

  numA = turnKQJto10(firstCard)
  numB = turnKQJto10(secondCard)

  if (thirdCard) {
    numC = turnKQJto10(thirdCard)
  }

  let sum = numA + numB + numC

  if (sum === 30) {
    sum = 0
  } else if (sum > 19) {
    sum -= 20
  } else if (sum > 9 && sum < 20) {
    sum -= 10
  }
  return sum
}

export interface GameCards {
  userNum: number
  userSuit: string
  botNum: number
  botSuit: string
  userFirst: string[]
  userSecond: string[]
  userThird?: string[]
  botFirst: string[]
  botSecond: string[]
  botThird?: string[]
}

// decide the winner
export const gameLogic = (gameCards: GameCards): string => {
  let winner: string = ''
  
  const {
    userNum,
    botNum,
    userSuit,
    botSuit,
    userFirst,
    userSecond,
    userThird,
    botFirst,
    botSecond,
    botThird,
  } = gameCards

  let userBiggestNum: number
  let botBiggestNum: number

  if (userThird) {
    userBiggestNum = findTheBiggestNum(userFirst, userSecond, userThird)
  } else {
    userBiggestNum = findTheBiggestNum(userFirst, userSecond, undefined)
  }

  if (botThird) {
    botBiggestNum = findTheBiggestNum(botFirst, botSecond, botThird)
  } else {
    botBiggestNum = findTheBiggestNum(botFirst, botSecond, undefined)
  }
    

  if (userNum === botNum && userSuit === botSuit) {
    if(userBiggestNum > botBiggestNum) {
      winner = 'User'
    } else {
      winner = 'Bot'
    }
  }

  if ((userNum === 8 || userNum === 9) && botNum < 8) {
    winner = 'User'
  } else if ((botNum === 8 || botNum === 9) && userNum < 8) {
    winner = 'Bot'
  } else if (userNum > botNum) {
    winner = 'User'
  } else if (botNum > userNum) {
    winner = 'Bot'
  } else if (userNum === botNum) {
    if (suits.indexOf(gameCards.userSuit) > suits.indexOf(gameCards.botSuit)) {
      winner = 'User'
    } else if (
      suits.indexOf(gameCards.botSuit) > suits.indexOf(gameCards.userSuit)
    ) {
      winner = 'Bot'
    }
  }
  return winner
}
