// Letters
const letters = 'abcdefghijklmnopqrstuvwxyz+#.'

//Array Of Letters
let lettersArray = Array.from(letters)

// letters Container
let lettersContainer = document.querySelector('.letters')

lettersArray.forEach((letter) => {
  let span = document.createElement('span')

  let spanText = document.createTextNode(letter)

  span.appendChild(spanText)
  span.className = 'letter-box'

  lettersContainer.appendChild(span)
})
const myRequest = new Request('category.json')
let randomValueValue;
fetch(myRequest)
  .then((response) => response.json())
  .then((words) => {
    //random categorie

    let allKeys = Object.keys(words)
    let randomPropNumber = Math.floor(Math.random() * allKeys.length)
    let randomPropName = allKeys[randomPropNumber]
    let randomPropValue = words[randomPropName]

    let randomValueNumber = Math.floor(Math.random() * randomPropValue.length)

    randomValueValue = randomPropValue[randomValueNumber]

    document.querySelector('.category span').innerHTML = randomPropName

    //--------------------

    let letterGuessContainer = document.querySelector('.letters-guess')

    let letterAndSpace = Array.from(randomValueValue)
    letterAndSpace.forEach((letter) => {
      let span = document.createElement('span')

      if (letter === ' ') {
        span.className = 'with-space'
      }
      letterGuessContainer.appendChild(span)
    })

    let theWrongAttemps = 0

    let theDraw = document.querySelector('.hangman-draw')

    document.addEventListener('click', (e) => {
      theStatus = false
      if (e.target.className === 'letter-box') {
        e.target.classList.add('clicked')

        let theClickedLetter = e.target.innerHTML.toLowerCase()

        let theChosenWord = Array.from(randomValueValue.toLowerCase())

        theChosenWord.forEach((wordletter, index) => {
          if (wordletter.toLowerCase() === theClickedLetter) {
            let answerArea = document.querySelectorAll('.letters-guess span')

            theStatus = true

            answerArea[index].innerHTML = theClickedLetter
          }
        })
        if (theStatus !== true) {
          theWrongAttemps++

          theDraw.classList.add(`wrong-${theWrongAttemps}`)

          document.getElementById('fail').play()

          if (theWrongAttemps === 8) {
            endGame()

            lettersContainer.classList.add('finshed')

            document.getElementById('lose').play()
          }
        } else {
          document.getElementById('success').play()
        }
      }
    })
 })

const endGame = () => {
  let div = document.createElement('div')

  let textDiv = document.createTextNode(
    `Game Over The Word Is: ${randomValueValue.toUpperCase()}`
  )

  div.appendChild(textDiv)

  div.className = `popup`

  document.body.appendChild(div)
  function playAgain() {
    document.querySelector('.popup').addEventListener('click', () => {
      window.open('index.html', 'self')
    })
  }
  playAgain()
}
