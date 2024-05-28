const buttons = document.querySelectorAll('button');
const operandADisplay = document.querySelector('#operandA');
const operandBDisplay = document.querySelector('#operandB');
const operatorDisplay = document.querySelector('#operator');

let operandA = '0';
operandADisplay.textContent = operandA;
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
  if (button.id === '=') {
    if (operandB.length >= 1) {
      operandA = operate(operandA, operandB, operator);
      operator = '';
      operandB = '';
    }
  } else if (operatorVals.includes(button.id)) {
    if (operandA === '0' && button.id === '-') {
      operandA = button.id;
    } else { 
      operator = button.id;
    }
  } else if (numberVals.includes(button.id) || button.id === '.') {
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
  }
  updateDisplay();
}

function changeOperand(operand, button) {
  if (operand.length >= 15) {
    //operand is full = do nothing
    return operand;
  } else if (button.id === '.') {
    if (operand.includes('.')) {
      return operand;
    } else {
      return operand += button.id;
    }
  } else if (operand === '0') {
    return button.id;
  } else {
    return operand += button.id;
  }
}

function updateDisplay() {
  operandADisplay.textContent = operandA;
  operatorDisplay.textContent = operator;
  operandBDisplay.textContent = operandB;
  //---
  console.log('A: ' + operandA);
  console.log(typeof operandA);
  console.log('OP: ' + operator);
  console.log('B: ' + operandB);
  console.log(typeof operandB);
  console.log('-----');
  //---
}

function add(a, b) {
	return parseFloat(a) + parseFloat(b);
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
    return add(a, b).toString();
  } else if (operation === '-') {
    return subtract(a, b).toString();
  } else if (operation === '/') {
    return divide(a, b).toString();
  } else if (operation === '*') {
    return multiply(a, b).toString();
  }
}