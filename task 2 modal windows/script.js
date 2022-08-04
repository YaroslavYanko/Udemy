'use strict';

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.close-modal')
const btnShowModel = document.querySelectorAll('.show-modal')

const openModel = () => {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
const hidenModal = () => {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

for (let i = 0; i < btnShowModel.length; i++) {
    btnShowModel[i].addEventListener('click', openModel)
}

btnCloseModal.addEventListener('click', hidenModal)
overlay.addEventListener('click', hidenModal)

document.addEventListener('keydown', function (event) {
    if (event.key == 'Escape' && !modal.classList.contains('hidden')) {
        hidenModal()
    }

})


