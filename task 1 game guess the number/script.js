'use strict';


let score = 20;
let highscore = 0
let secretNumber = Math.trunc(Math.random() * 20) + 1

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message
}

document.querySelector('.check').addEventListener('click',
    () => {

        const guess = Number(document.querySelector('.guess').value)

        if (!guess) {
            displayMessage('Write the number')

        } else if (guess === secretNumber) {
            //When we win game 
            displayMessage('Correct number')
            document.querySelector('body').style.background = 'green'
            document.querySelector('.number').style.width = '30rem'
            document.querySelector('.number').textContent = secretNumber
            if (score > highscore) {
                highscore = score
                document.querySelector('.highscore').textContent = score
            }

        } else if (score !== 1) {
            if (guess !== secretNumber) {
                displayMessage(guess < secretNumber ? 'Number too low' : 'Number too hight')
                score--
            }

        } else if (score <= 1) {

            displayMessage('You lose the game')

        }


        document.querySelector('.score').textContent = score


        // !guess ? message = 'Write the number' :
        //     guess === secretNumber ? document.querySelector('.message').textContent = 'Correct number' :
        //         guess < secretNumber ? document.querySelector('.message').textContent = 'Number too low'
        //             : document.querySelector('.message').textContent = 'Number too hight'
    })


document.querySelector('.again').addEventListener('click', function () {
    document.querySelector('.guess').value = null
    displayMessage('Start guessing...')
    secretNumber = secretNumber = Math.trunc(Math.random() * 20) + 1
    document.querySelector('.number').textContent = '?'
    score = 20
    document.querySelector('.score').textContent = score
    document.querySelector('.number').style.width = '15rem'
    document.querySelector('body').style.background = '#222'
})
