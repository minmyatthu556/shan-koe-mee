const suits = ['spades', 'hearts', 'diamonds', 'clubs']
const numbers = ['A', 'K', 'Q', 'J', '2', '3', '4', '5', '6', '7', '8', '9']

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
const drawACard = (): string[] => {
  const randomIndex = generateRandomNumber(48)
  const chosenCard = deck[randomIndex]

  deck = deck.filter((card) => card !== chosenCard)
  return chosenCard
}
