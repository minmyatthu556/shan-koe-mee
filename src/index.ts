const inquirer = require('inquirer')

import { turnKQJto10, printCard } from './utils/helpers'
import { findBiggerSuit, findNumberScore, gameLogic, GameCards } from './utils/logics'

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
          userFirst: userFirstCard,
          userSecond: userSecondCard,
          userThird: userDrawCard,
          botFirst: botFirstCard,
          botSecond: botSecondCard,
          botThird: botDrawCard
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