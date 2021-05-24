const inquirer = require('inquirer')

import { turnKQJto10, printCard } from './utils/helpers'
import { findBiggerSuit, findNumberScore } from './utils/logics'

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

// function to return a random card from deck and remove that card from deck
const drawACard = (): string[] => {
  const randomIndex = Math.floor(Math.random()*(deck.length))
  const chosenCard = deck[randomIndex]

  deck = deck.filter((card) => card !== chosenCard)
  return chosenCard
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
  const userFirstCard = drawACard()
  const botFirstCard = drawACard()
  const userSecondCard = drawACard()
  const botSecondCard = drawACard()

  let botDrawCard: string[] | undefined
  let userDrawCard: string[] | undefined

  let userSuitScore = findBiggerSuit(userFirstCard, userSecondCard)
  let botSuitScore = findBiggerSuit(botFirstCard, botSecondCard)

  let userNumScore = findNumberScore(userFirstCard, userSecondCard)
  let botNumScore = findNumberScore(botFirstCard, botSecondCard)

  if (botNumScore < 5) {
    botDrawCard = drawACard()
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
          userDrawCard = drawACard()
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