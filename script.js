const buttons = document.querySelectorAll('button');
const operandADisplay = document.querySelector('#operandA');
const operandBDisplay = document.querySelector('#operandB');
const operatorDisplay = document.querySelector('#operator');

let operandA = '0';
operandADisplay.textContent = operandA;
let operandB = '';
let operator = '';

const operandVals = '0123456789.';
const operatorVals = '+-*/';
const characterLimit = 15;

buttons.forEach((button) => {
  button.addEventListener('mousedown', () => {
    processDown(button);
  });
  button.addEventListener('mouseup', () => {
    processUp(button);
  });
  button.addEventListener('mouseenter', () => {
    processEnter(button);
  });
  button.addEventListener('mouseleave', () => {
    processLeave(button);
  });
});

function processDown(button) {
  button.classList.remove('btnShadow');
  button.classList.add('btnShadowClicked');
  if (button.id === 'ac') {
    operandA = '0';
    operator = '';
    operandB = '';
  } else if (button.id === '=') {
    if (operandB.length >= 1) {
      operandA = operate(operandA, operandB, operator);
      operator = '';
      operandB = '';
    }
  } else if (operatorVals.includes(button.id)) {
    if (operandA === '0' && operator === '' && button.id === '-') {
      operandA = '-';
    } else if (operandA !== '-' && operator === '') { 
      operator = button.id;
    }
  } else if (operandVals.includes(button.id)) {
    if (operator !== '') {
      operandB = changeOperand(operandB, button);  
    } else {
      operandA = changeOperand(operandA, button);
    }
  } else if (operatorVals.includes(button.id)) {
    operator = button.id;
  } else if (button.id === 'ce') {
    if (operandB === '0.') {
      operandB = '';
    } else if (operandB !== '') {
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

function processUp(button) {
  button.classList.remove('btnShadowClicked');
  button.classList.add('btnShadow');
}

function processEnter(button) {
  button.classList.add('btnHover');
}

function processLeave(button) {
  if (button.classList.contains('btnHover')) {
    button.classList.remove('btnHover');
  }
  if (button.classList.contains('btnShadowClicked')) {
    button.classList.remove('btnShadowClicked');
    button.classList.add('btnShadow');
  }
}

function changeOperand(operand, button) {
  if (operand.length >= characterLimit) {
    //operand is full = do nothing
    return operand;
  } else if (button.id === '.') {
    if (operator !== '') {
      if (operand === '') {
        return '0.';
      } else {
        return operand + '.';
      }
    } else if (operand.includes('.')) {
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
  console.log("typeof A: " + typeof operandA);
  console.log('OP: ' + operator);
  console.log('B: ' + operandB);
  console.log("typeof B: " + typeof operandB);
  console.log('-- Display updated --');
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
  let result = '';
  if (operation === '+') {
    result = add(a, b).toString();
  } else if (operation === '-') {
    result = subtract(a, b).toString();
  } else if (operation === '/') {
    result = divide(a, b).toString();
  } else if (operation === '*') {
    result = multiply(a, b).toString();
  }
  if (result.includes('.') && result[result.length - 1] === '0') {
    result = removeZero(result);
  }
  if (result.length > characterLimit) {
    console.log('Result too long, cutting down to characterLimit.');
    if (result.includes('.')) {
      let decimalLength = result.slice(result.indexOf('.') + 1).length;
      console.log('decimalLength: ' + decimalLength);
      let targetLength = decimalLength - (result.length - characterLimit);
      console.log('targetLength: ' + targetLength);
      console.log('result before: ' + result);
      result = parseFloat(result).toFixed(targetLength);
      if (result.includes('.') && result[result.length - 1] === '0') {
        return removeZero(result);
      }
    } else {
      alert("Outcome larger than character limit: result isn't accurate ;-(");
      return result.slice(0, characterLimit);
    }
  }
  return result;
}

function removeZero(val) {
  console.log('Removing zeros...');
  console.log('Result before cutting: ' + val);
  let cutHere = 0;
  let keepGoing = 1;
  let i = 0;
  let tempVal = val.split('').reverse();
  while (keepGoing === 1) {
    if (tempVal[i] === '0') {
      cutHere += 1;
      i ++;
    } else {
      keepGoing = 0;
    }
  }
  console.log('First non-zero at:' + cutHere);
  return val.slice(0, -cutHere);
}