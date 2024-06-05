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
    processDown(button, 'mouse');
  });
  button.addEventListener('mouseup', () => {
    processUp(button, 'mouse');
  });
  button.addEventListener('mouseenter', () => {
    processEnter(button, 'mouse');
  });
  button.addEventListener('mouseleave', () => {
    processLeave(button, 'mouse');
  });
});

document.addEventListener("keydown", (e) => {
  if (operandVals.includes(e.key) || operatorVals.includes(e.key)) {
    processDown(e.key, 'keyboard');
  } else if (e.key === 'Enter') {
    processDown('=', 'keyboard');
  } else if (e.key === 'Backspace') {
    processDown('ce', 'keyboard');
  }
});

function processDown(button, source) {
  let input;
  if (source === 'mouse') {
    input = button.id;
    button.classList.remove('btnShadow');
    button.classList.add('btnShadowClicked');
  } else if (source === 'keyboard') {
    input = button;
  }
  //console.log(input + ' ' + source);
  if (input === 'ac') {
    operandA = '0';
    operator = '';
    operandB = '';
  } else if (input === '=') {
    if (operandB.length >= 1) {
      operandA = operate(operandA, operandB, operator);
      operator = '';
      operandB = '';
    }
  } else if (operatorVals.includes(input)) {
    if (operandA === '0' && operator === '' && input === '-') {
      operandA = '-';
    } else if (operandA !== '-' && operator === '') { 
      operator = input;
    }
  } else if (operandVals.includes(input)) {
    if (operator !== '') {
      operandB = changeOperand(operandB, input);  
    } else {
      operandA = changeOperand(operandA, input);
    }
  } else if (operatorVals.includes(input)) {
    operator = input;
  } else if (input === 'ce') {
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

function changeOperand(operand, input) {
  if (operand.length >= characterLimit) {
    //operand is full = do nothing
    return operand;
  } else if (input === '.') {
    if (operator !== '') {
      if (operand === '') {
        return '0.';
      } else {
        return operand + '.';
      }
    } else if (operand.includes('.')) {
      return operand;
    } else {
      return operand += input;
    }
  } else if (operand === '0') {
    return input;
  } else {
    return operand += input;
  }
}

function updateDisplay() {
  operandADisplay.textContent = operandA;
  operatorDisplay.textContent = operator;
  operandBDisplay.textContent = operandB;
  /*
  console.log('A: ' + operandA);
  console.log("typeof A: " + typeof operandA);
  console.log('OP: ' + operator);
  console.log('B: ' + operandB);
  console.log("typeof B: " + typeof operandB);
  console.log('-- Display updated --');
  */
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
  if (b === '0' && operation === '/') {
    alert("Please don't do that, it's very cheeky.");
    return '0';
  }
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
    //console.log('Result too long, cutting down to characterLimit.');
    if (result.includes('.')) {
      let decimalLength = result.slice(result.indexOf('.') + 1).length;
      //console.log('decimalLength: ' + decimalLength);
      let targetLength = decimalLength - (result.length - characterLimit);
      //console.log('targetLength: ' + targetLength);
      //console.log('result before: ' + result);
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
  //console.log('Removing zeros...');
  //console.log('Result before cutting: ' + val);
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
  //console.log('First non-zero at:' + cutHere);
  return val.slice(0, -cutHere);
}