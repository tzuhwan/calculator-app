/**
 * 
 *Unresolved bugs:
 1. Error message display: add p tags then turn on visible

 * 
 * 
 */


// Project Constants 

// Global Variables 
let _displayVar = '';
let _firstNum = null;
let _secondNum = null;
let _currOperator = null;
let _isClear = false;
let _isError = false;


// Basic math functions 
function add(x, y) {
	
	return x + y;
}

function subtract (x, y) {
	return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return "ERROR: Cannot divde by zero";
    }
    return Number(x / y);
}


function power(base, exp) {
	return base < 0 ? "negative number not permitted" : Math.pow(base, exp);
}

function factorial(num) {
	if (num < 0 ) {
		return -1;
	} 
	else if (num === 0) {
		return 1;
	}
	else {
		return num * factorial(num - 1);
	}
}

//
function operate(func, firstNum, secondNum) {
	if (secondNum === null) {
		_isError = true;
		return "ERROR: Please select another number";
	} 

	const x = Number(firstNum);
	const y = Number(secondNum);
	
	switch (func) {
		case '+':
			return add(x, y);
			break;
		case '-':
			return subtract(x, y);	
			break;
		case '*':
			return multiply(x, y);
			break;
		case '/':
			if (y === 0) {
				_isError = true;
				return "ERROR: Cannot divide by zero";
			} else if (divide(x, y).toString().length > 4) {
				return divide(x, y).toFixed(4);
			} else {
				return divide(x, y);
			}
			break;
		default:
			_isError = true;
			return 'ERROR: Please select an operator';
	}
}


// Function to display selected digits
function displayDigits() {
	const display = document.querySelector('#display');

	const digitBtns = document.querySelectorAll('.digit-btn');
	digitBtns.forEach(digitBtn => {
		digitBtn.addEventListener('click', event => {
			if (_isClear) {
				clearDisplay();
				_isClear = false;
			}
			if (!_isError) {
				display.textContent = limitDigitDisplay(_displayVar += digitBtn.textContent);
			}
		})
	})
}


// Clears display
function clearDisplay() {
	_displayVar = '';
	if (document.querySelector('#error-message')) {
		document.querySelector('#error-message').id = 'display';
	}
	const display = document.querySelector('#display');
	display.textContent = _displayVar;
}

// Adds event listener to operator Buttons
function addOperatorListener() {
	const operatorBtns = document.querySelectorAll('.operator-btn');
	operatorBtns.forEach(operatorBtn => {
		operatorBtn.addEventListener('click', event => {
			storeNumOperator(operatorBtn.textContent);
			_isClear = true;
			_displayVar = null;
		})
	})
}

// Store user numbers and selected operator
function storeNumOperator(operator) {
	if (_firstNum === null) {
		_firstNum = _displayVar;
	} else {
		_secondNum = _displayVar;
	}
	_currOperator = operator;
}


// Limit number of display digits to 10
function limitDigitDisplay(text) {
	return (text.length > 10 ? text.substring(0, 10) : text);
}

// Add event listener to clear button
const clearBtn = document.querySelector('#ac');
clearBtn.addEventListener('click', event => {
	clearDisplay();
	_firstNum = _secondNum = _currOperator = null;
	_isError = false;
});


// Add event listener that executes operation to equal button
const equalBtn = document.querySelector('#equal');
equalBtn.addEventListener('click', event => {
	_secondNum = _displayVar;
	_displayVar = operate(_currOperator, _firstNum, _secondNum);

	const display = document.querySelector('#display');
	display.textContent = _displayVar;

	if (_isError) {
		display.id = 'error-message';
	} 

	_firstNum = _displayVar;
	_secondNum = null;
	_currOperator = null;
});

displayDigits();
addOperatorListener();

