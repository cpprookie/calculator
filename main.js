/*
 * Event binding
 * produce an input array  
 */
window.onload = function () {
  screen = {
    _value: '0',

    get watch () {
      return this._value
    },

    set watch (val) {
      console.log('>>>>>>>')
      document.querySelector('.output').textContent = val
      this._value = val
    }
  }
  screen.watch = '0'
  inputArr = []
  document.querySelector('.container').addEventListener('click', action)
}


// handle input
function action (event) {
  let target = event.target
  let input = target.textContent
  // type number
  if (target.className === 'key') {

    if (['+','-','*','/'].includes(inputArr[inputArr.length-1]) || (screen.watch === '0' &&  input !== '.')) {
      screen.watch = input
    } else {
      screen.watch += input
    }
  } 
  
  // clear input and screen
  else if (input === 'AC'){
    screen.watch = '0'
    inputArr = []
  } 
  
  /*  */
  else if (input === '=') {
    inputArr.push(parseFloat(screen.watch))
    if (inputArr.length < 3) {
      inputArr = []
    } else {
      exec(inputArr)
    } 
  } 
  
  else {
    inputArr.push(parseFloat(screen.watch)) 
    if (inputArr.length === 3) {
      exec(inputArr)
    } 
    // type operator twice
    else if (['+', '-', '*', '/'].includes(inputArr[inputArr.length-1])) {
      inputArr[inputArr.length-1] = input
    } else {
      inputArr.push(input)
    }
  }
}
 

/* core  calculation */

function exec (inputArr) {
  let operator = inputArr[1]
  console.log(inputArr)
  switch (operator) {
    case '+': 
      screen.watch =  (inputArr[0] + inputArr[2]).toString()
      break
    case '-': 
      screen.watch =  (inputArr[0] - inputArr[2]).toString()
      break
    case '*':
      screen.watch =  (inputArr[0] * inputArr[2]).toString()
      break
    default :
      screen.watch =  (inputArr[0] / inputArr[2]).toString()
  }
  inputArr = []
  return screen.watch
}