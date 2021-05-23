# Shan-Koe-Mee

*Burmese tranditional card game*
---
##### Clone the repo and install the dependencises using
##### `npm install`
##### To start the program
##### `npm start`
---
## How to play
1. Both user and bot are first given two cards each. 
2. Find the sum of the numbers of your cards. Take the last digit of the sum (i.e if the sum if 19, your score is 9, etc). That's your number score. 
3. Your suit score is the suit of the card with largest number. (*(Here, the program will automatically calculate the score for you))
5. You will have an option to draw one card. If you're satisfied with your score with just two cards, you don't need to draw.
6. If you draw, find the score of your numbers and suits using the above method.
7. Bot will do the same. 

### How the game works
You will need to compare your number score to the bot's number score. The person with larger number score wins. 
If both parties have the same number score, you'll need to compare the suit score. 
The suit score works like this: Spade > Diamond > Heart > Clubs.
The person with the larger suit score wins.
