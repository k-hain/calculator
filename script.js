const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

let operandA = '0';
let operandB = '';
let operator = '';

const numberVals = '0123456789';
const operatorVals = '+-*/';

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    processInput(button);
  });
});

function processInput(button) {
  if (display.textContent.length >= 15 && button.id !== 'ce' && button.id !== '=') {
    //full
  } else if (numberVals.includes(button.id)) {
    if (operator !== '') {
      operandB = changeOperand(operandB, button);
    } else {
      operandA = changeOperand(operandA, button);
    }
  } else if (operatorVals.includes(button.id)) {
    operator = button.id;
  } else if (button.id === 'ce') {
    if (operandB !== '') {
      operandB = operandB.slice(0, -1);
    } else if (operator !== '') {
      operator = '';
    } else {
      if (operandA.length === 1) {
        operandA = '0';
      } else if (operandA.length === 2 && operandA.includes('-')) {
        operandA = '0';
      } else {
        operandA = operandA.slice(0, -1);
      }
    }
  } else if (button.id === '=') {
    if (operandB.length >= 1) {
      operandA = operate(operandA, operandB, operator);
      operator = '';
      operandB = '';
    }
  } else if (button.id === '.') {
    if (operandB === '' && operator === '' && !operandA.includes('.')) {
      operandA = changeOperand(operandA, button);
    } else if (!operandB !== '' && !operandB.includes('.')) {
      operandB = changeOperand(operandB, button);
    }
  }
  updateDisplay();
}

function changeOperand(operand, button) {
  if (operand === '0') {
    return button.id;
  } else {
    return operand += button.id;
  }
}

function updateDisplay() {
  if (operandB === '' && operator === '') {
    display.textContent = operandA;
    console.log('Displaying A');
  } else if (operandB === '') {
    display.textContent = operandA + ' ' + operator;
    console.log('Displaying A+OP');
  } else {
    display.textContent = operandA + ' ' + operator + ' ' + operandB;
    console.log('Displaying A+OP+B');
  }
  console.log('A: ' + operandA);
  console.log('OP: ' + operator);
  console.log('B: ' + operandB);
  console.log(typeof operandA);
  console.log('-----');
}

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function divide(a, b) {
	return a / b;
}

function multiply(a, b) {
	return a * b;
}

function operate(a, b, operation) {
  if (operation === '+') {
    return add(a, b);
  } else if (operation === '-') {
    return subtract(a, b).toString();
  } else if (operation === '/') {
    return divide(a, b).toString();
  } else if (operation === '*') {
    return multiply(a, b).toString();
  }
}