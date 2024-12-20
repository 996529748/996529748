import { NumberFlip } from '../index';
var numberFlip1 = new NumberFlip({ rootElement: document.getElementById('number-flip-1') });
console.log('numberFlip1', numberFlip1)
function setRandomNumber() {
    var randomNumber = Math.floor(Math.random() * 1000000);
    numberFlip1.setNumber(randomNumber);
}

// Set initial random number and update every second
setRandomNumber();
setInterval(setRandomNumber, 5000);

// Example 2: Manually set number (existing code)
var numberFlip2 = new NumberFlip({ rootElement: document.getElementById('number-flip-2'), initialNumber: 238 });
var numberInput = document.getElementById('number-input');
var button = document.getElementById('button');
button.addEventListener('click', changeNumber);

function changeNumber() {
    var newNumber = numberInput.value;
    numberFlip2.setNumber(newNumber);
}
