'use strict';

const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')

const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

const diceEl = document.querySelector('.dice')
const bntNew = document.querySelector('.btn--new')
const bntRoll = document.querySelector('.btn--roll')
const bntHold = document.querySelector('.btn--hold')

let scores, activePlayer, currentScore, playing


activePlayer = 0


//Почати нову гру 
const newGame = () => {
    playing = true
    scores = [0, 0]
    score0El.textContent = 0
    score1El.textContent = 0
    currentScore = 0
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
    diceEl.classList.add('hidden')


    activePlayer = 0
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active')

}
newGame()


//Функція зміни гравця
const switchPlayer = () => {
    //3.1 Якщо випадає 1 то значення згорає 
    currentScore = 0
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
    //3.2 Міняєм значення активного гравця 
    activePlayer = activePlayer === 0 ? 1 : 0
    //3.3 Міняєм фон для активного гравця
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
    //3.4 Ховаєм кубик
    diceEl.classList.add('hidden')
}

//Кинути кубик
bntRoll.addEventListener('click', () => {
    //playing буде true поки гравець не переможе
    if (playing) {
        //1 Генеруєм випадкове число
        const dice = Math.trunc(Math.random() * 6) + 1

        //2 Показуєм кубик з випадковим числом
        diceEl.classList.remove('hidden')
        diceEl.setAttribute('src', `dice-${dice}.png`)

        //3 Зміна гравця коли випадає кубик з числом 1
        if (dice !== 1) {
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            //Функція зміни гравця
            switchPlayer()
        }
    }

})

//Зберегти отримані очки 
bntHold.addEventListener('click', () => {
    //1 Передаєм очки в масив активного гравця
    //playing буде true поки гравець не переможе
    if (playing) {
        scores[activePlayer] += currentScore

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

    }

    //2 Якщо гравець виграв - закінчуєм гру
    if (scores[activePlayer] >= 10) {
        playing = false
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        diceEl.classList.add('hidden')
        // bntRoll.setAttribute('disabled', true)
        // bntHold.setAttribute('disabled', true)
    } else {
        //2.1 Функція зміни гравця
        switchPlayer()
    }
})

//Викликаєм callback функцію 
bntNew.addEventListener('click', newGame)
