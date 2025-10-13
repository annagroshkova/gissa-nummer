//level form variables
const levelForm = document.getElementById('level-form')
const levelSubmitBtn = document.getElementById('level__submit-btn')
const radioInputs = levelForm.querySelectorAll('.radio__input')
let level = ''

//game form variables
const gameForm = document.getElementById('game-form')
const gameMessageSpan = document.getElementById('game__message')
const gameNumberSpan = document.getElementById('game__guessed-number')
const numberInput = document.getElementById('number-input')
const gameSubmitBtn = document.getElementById('game__submit-btn')
let randomNumber = 0
let guessedNumber = 0
let count = 1

// replay form variables
const replayForm = document.getElementById('replay-form')
const replayMessageSpan = document.getElementById('replay__message')
const replayNumberSpan = document.getElementById('replay__guessed-number')
const replaySubmiyBtn = document.getElementById('replay__submit-btn')
const gifCard = document.getElementById('gif-card')
let gifArray = [
    'Excited_Family_Guy.gif',
    'Happy_Jennifer_Aniston.gif',
    'Happy_Sesame_Street.gif',
    'Happy_SpongeBob_SquarePants.gif'
]


//functions
let submitLevel = event => {
    event.preventDefault()
    let checked = Array.from(radioInputs).find(
        (input) => input.checked === true
    )
    level = checked.value

    switch (level) {
        case 'lätt':
            randomNumber = getRandomNumber(1, 10)
            gameMessageSpan.textContent = 'Välj ett nummer mellan 1 och 10'
            numberInput.max = 10
            break
        case 'medel':
            randomNumber = getRandomNumber(1, 50)
            gameMessageSpan.textContent = 'Välj ett nummer mellan 1 och 50'
            numberInput.max = 50
            break
        case 'svår':
            randomNumber = getRandomNumber(1, 100)
            gameMessageSpan.textContent = 'Välj ett nummer mellan 1 och 100'
            numberInput.max = 100
            break
    }

    swapForms(levelForm, gameForm, () => {
        numberInput.value = ''
        numberInput.focus()
    })
}

let submitNumber = event => {
    event.preventDefault()
    console.log(randomNumber)

    if (!numberInput.value) {
        gameMessageSpan.textContent = 'Du måste ange ett nummer'
    } else {
        guessedNumber = Number(numberInput.value)
        gameNumberSpan.textContent = `${guessedNumber} `
        if (guessedNumber > randomNumber) {
            gameMessageSpan.textContent = 'är för högt! Försök igen'
            count++
        } else if (guessedNumber < randomNumber) {
            gameMessageSpan.textContent = 'är för lågt! Försök igen'
            count++
        } else if (guessedNumber === randomNumber) {
            replayNumberSpan.textContent = `${guessedNumber} `
            replayMessageSpan.textContent = `är korrekt! Du gissade rätt efter ${count} försök`
            let gifIndex = getRandomNumber(0, gifArray.length - 1)
            gifCard.src = `assets/${gifArray[gifIndex]}`
            swapForms(gameForm, replayForm)
            gameNumberSpan.textContent = ''
            count = 1
        }

        numberInput.value = ''
        numberInput.focus()
    }
}

let enableSubmit = element => {
    element.disabled = false
}

let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

let swapForms = (hide, show, cb) => {
    hide.classList.add('hidden')

    hide.addEventListener('transitionend', function handler() {
        hide.style.display = 'none'
        show.style.display = 'flex'

        // force reflow so transition works
        void show.offsetWidth

        show.classList.remove('hidden')
        hide.removeEventListener('transitionend', handler)
        cb?.()
    })
}


//listeners
window.addEventListener('load', () => {
    levelForm.style.display = 'flex'
})

radioInputs.forEach((input) => {
    input.addEventListener('change', () => enableSubmit(levelSubmitBtn))
})

numberInput.addEventListener('input', () => enableSubmit(gameSubmitBtn))

levelForm.addEventListener('submit', submitLevel)

gameForm.addEventListener('submit', submitNumber)

replayForm.addEventListener('submit', () => swapForms(replayForm, levelForm))
