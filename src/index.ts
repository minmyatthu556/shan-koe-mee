const suits = ['spades', 'hearts', 'diamonds', 'clubs']
const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9']

const buildADeck = () => {
  let deck: string[][] = []
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      deck.push([suits[i], numbers[j]])
    }
  }
  return deck
}

const deck = buildADeck()
console.log(deck)
