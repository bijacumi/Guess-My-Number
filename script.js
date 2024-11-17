let randomNumber = 0 // the random number the computer selects
let digitsOfRandomNumber = [] // the digits of the number that the computer selects randomly
let inputNumber = 0 // the numbers that I tell the computer
let digitsOfInputNumber = [] // the digits of the input number
let digitsZeroToNine = [] // put the digits 0 to 9 in an array because I will need them later
let centeredValue = 0
let displacedValue = 0
let playing = false // this will ensure that the game doesn't reset right in the middle of playing
let averageMoves = 0 // the average of the number of moves in which you win the game
let averageTime = 0 // the average of the time in which you win the game, in seconds which I will display in minutes and seconds
let moves = 0 // I will have a maximum of moves at which the game ends
let arrayOfMovesAndTimes = [0,0] // this will record your best 5 or 10 (I still need to decide which) plays and then do the average

const playAgain = document.getElementById('play-again')
const getNumber = document.getElementById('btn-check')
const guessedNumber = document.getElementById('number-input')
const explanation = document.getElementById('explanation')



function resetDigitsArray (array) {
    for (let i = 0; i < 10; i++) {
    array[i] = i;
    }
}

function generateRandomNumber() { 
    playing = true
    randomNumber = 0
    let randomSelector = 0

    for (i = 0; i<=4; i++) {
        if (i==0) {
            randomSelector = Math.trunc(Math.random() * 9) + 1
        }
        else {randomSelector = Math.trunc(Math.random()*digitsZeroToNine.length)}

        digitsOfRandomNumber[i] = digitsZeroToNine[randomSelector]
        randomNumber += digitsOfRandomNumber[i]*10**(4-i)
        digitsZeroToNine.splice(randomSelector, 1) 
    }
    console.log(`The random number is ${randomNumber}`)
    resetDigitsArray(digitsZeroToNine)
    explanation.textContent = "It's a five digit number where the first digit cannot be 0 and the digits do not repeat themselves. The clues you will receive are the number of digits that are in the number on their exact position (🎯🎯🎯) and the number of digits that are in the number but their position is different (🤏🤏🤏)" 
    guessedNumber.value = ''
    guessedNumber.focus()
    deleteAllRows()
}

function splitNumberIntoDigits (number) {
    let divisor = 0
    let partialNumber = number
    for (i=0; i<=4; i++) {
        divisor = 10**(4-i)
        digitsOfInputNumber[i] = Math.floor(partialNumber/divisor)
        partialNumber = number % divisor
    }
}

function compareDigits () {
    centeredValue = 0
    displacedValue = 0
    for (i=0; i<=4; i++) {
        let skipOuterLoop = false
        for (let j=0; j<=4; j++) {
            if (digitsOfInputNumber[i] === digitsOfRandomNumber[j]) {
                if (i===j) centeredValue++
                else displacedValue++
                skipOuterLoop = true
                break
            }
        }
        if (skipOuterLoop) continue
    }  
}

function guessANumber() {
    inputNumber = Number(guessedNumber.value)
    guessedNumber.value = ''
    if (inputNumber === randomNumber) {
        explanation.textContent = `✅✅✅ You Won! The number was ${randomNumber} and you guessed it! ✅✅✅`
        playing = false
    }
    else {
        splitNumberIntoDigits(inputNumber)
        compareDigits()
        guessedNumber.focus()
        addRows(inputNumber, centeredValue, displacedValue)
    }
}

function addCell(row, value){
    const newCell = document.createElement("td"); // even if you have declared it as a universal variable, you still need to put it here to create the cell every time. Same below for rows. And you have to put const in the function to create the variable again every time. But it's just better to put it here and not make it universal because you are only using it here and this way you don't take up memory space.
    newCell.textContent = value;
    row.appendChild(newCell);
}
function addRows(number, center, offCenter){
    const tableBody = document.getElementById('table-body')
    const newRow = document.createElement("tr");
    addCell(newRow, number);
    addCell(newRow, center);
    addCell(newRow, offCenter);
    tableBody.appendChild(newRow);
};

function deleteAllRows() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; //apparently, I need to put the innerHTML because it's a constant and with that I can somewhat still modify it??? I am not sure I understand
}


resetDigitsArray(digitsZeroToNine)
if (!playing) generateRandomNumber()
playAgain.addEventListener('click', generateRandomNumber)
getNumber.addEventListener('click', guessANumber)
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        guessANumber()
    }
})

/* to restrict the input number to only 5 digits
document.getElementById("number-input").addEventListener("input", function(event) {
    let value = event.target.value;

    // Ensure the value only contains digits (remove non-numeric characters)
    value = value.replace(/\D/g, '');

    // Limit the length to 5 digits
    if (value.length > 5) {
        value = value.slice(0, 5);
    }

    // Set the value back to the input field
    event.target.value = value;
});

*/