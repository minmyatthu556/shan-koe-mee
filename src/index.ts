const inquirer = require('inquirer')

const suits = ['♣️', '♦️', '♥️', '♠️']
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A']

// function to build a deck of cards (eg. [spades, A])
const buildADeck = (): string[][] => {
  let deck: string[][] = []
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      deck.push([suits[i], numbers[j]])
    }
  }
  return deck
}

let deck = buildADeck()

// function to generate random number from 0 to assigned parameter
const generateRandomNumber = (num: number): number => {
  return Math.floor(Math.random() * num)
}

// function to return a random card from deck and remove that card from deck
const drawACard = (num: number): string[] => {
  const randomIndex = generateRandomNumber(num)
  const chosenCard = deck[randomIndex]

  deck = deck.filter((card) => card !== chosenCard)
  return chosenCard
}

// turn K, Q, J into the value of 10 and A into the value of 1
const turnKQJto10 = (array: string[]): number => {
  let number: number = 0
  if (numbers.indexOf(array[1]) < 8) {
    number = numbers.indexOf(array[1]) + 2
  } else if (numbers.indexOf(array[1]) > 7 && numbers.indexOf(array[1]) < 11) {
    number = 10
  } else if (numbers.indexOf(array[1]) === 11) {
    number = 1
  }
  return number
}

// find the suit of the card with bigger number
const findBiggerSuit = (
  arrayA: string[],
  arrayB: string[],
  arrayC: string[] | null = null
): string => {
  if (!arrayC) {
    const cardWithBiggerNum =
      numbers.indexOf(arrayA[1]) > numbers.indexOf(arrayB[1]) ? arrayA : arrayB
    return cardWithBiggerNum[0]
  } else {
    const max = Math.max(
      numbers.indexOf(arrayA[1]),
      numbers.indexOf(arrayB[1]),
      numbers.indexOf(arrayC[1])
    )
    if (max === numbers.indexOf(arrayA[1])) {
      return arrayA[0]
    } else if (max === numbers.indexOf(arrayB[1])) {
      return arrayB[0]
    } else {
      return arrayC[0]
    }
  }
}

// find the score of the number of the two cards
const findNumberScore = (
  arrayA: string[],
  arrayB: string[],
  arrayC: string[] | null = null
): number => {
  let numA: number
  let numB: number
  let numC = 0

  numA = turnKQJto10(arrayA)
  numB = turnKQJto10(arrayB)

  if (arrayC) {
    numC = turnKQJto10(arrayC)
  }

  let sum = numA + numB + numC

  if (sum === 20 || sum === 30) {
    sum = 0
  } else if (sum > 19) {
    sum -= 20
  } else if (sum > 9 && sum < 20) {
    sum -= 10
  }
  return sum
}

const printCard = (cardArray: string[]) => {
  return `${cardArray[1]} ${cardArray[0]}`
}

interface GameCards {
  userNum: number
  userSuit: string
  botNum: number
  botSuit: string
}

// decide the winner
const gameLogic = (gameCards: GameCards): string => {
  let winner: string = ''
  const { userNum, botNum, userSuit, botSuit } = gameCards

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

// gameplay
const playGame = () => {
  const userFirstCard = drawACard(48)
  const userSecondCard = drawACard(47)
  const botFirstCard = drawACard(46)
  const botSecondCard = drawACard(45)
  let botDrawCard: string[] | undefined
  let userDrawCard: string[] | undefined

  let userSuitScore = findBiggerSuit(userFirstCard, userSecondCard)
  let botSuitScore = findBiggerSuit(botFirstCard, botSecondCard)

  let userNumScore = findNumberScore(userFirstCard, userSecondCard)
  let botNumScore = findNumberScore(botFirstCard, botSecondCard)

  if (botNumScore < 5) {
    botDrawCard = drawACard(44)
    botSuitScore = findBiggerSuit(botFirstCard, botSecondCard, botDrawCard)
    botNumScore = findNumberScore(botFirstCard, botSecondCard, botDrawCard)
  }

  console.log(`\nUser first card is ${printCard(userFirstCard)}`)
  console.log(`User second card is ${printCard(userSecondCard)}`)
  console.log(`User current score: Suits: ${userSuitScore}  and Number: ${userNumScore}\n`)

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
      .then((answer: { response: string }) => {
        if (answer.response === 'yes') {
          userDrawCard = drawACard(43)
          userSuitScore = findBiggerSuit(
            userFirstCard,
            userSecondCard,
            userDrawCard
          )
          userNumScore = findNumberScore(
            userFirstCard,
            userSecondCard,
            userDrawCard
          )
        }

        console.log(`\n${userDrawCard ? `User drew ${printCard(userDrawCard)}` : ''}`)
        console.log(`User score: Suits: ${userSuitScore}  and Number: ${userNumScore}\n`)

        const gameCards: GameCards = {
          userNum: Number(userNumScore),
          userSuit: userSuitScore,
          botNum: Number(botNumScore),
          botSuit: botSuitScore,
        }

        const winner = gameLogic(gameCards)

        console.log(`Bot cards are: ${printCard(botFirstCard)} ${botDrawCard ? ' ,' : ' and'} ${printCard(botSecondCard)} ${
          botDrawCard ? ` and ${printCard(botDrawCard)}` : ''
        }`)
        console.log(`Bot score: Suits: ${botSuitScore}  and Number: ${botNumScore}\n`)

        if(winner === 'User') {
          console.log('🍾CONGRATULATIONS🍾\nYou Win 🎊\n')
        } else {
          console.log('Sorry 😞 bot wins. Good luck next time 🍀\n')
        }
      })
  }, 1000)
}

playGame()
