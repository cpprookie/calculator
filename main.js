/*
 * Event binding
 * produce an input array  
 */
window.onload = function () {
  screen = {
    _value: '0',

    get display () {
      return this._value
    },

    set display (val) {
      document.querySelector('.output').textContent = val
      this._value = val
    }
  }
  screen.display = '0'

  realValue = '0'
  inputArr = []
  document.querySelector('.container').addEventListener('click', action)
}


/* input handler */
function action (event) {
  let target = event.target,
       input = target.textContent,
        flag = ['+','-','*','/'].includes(inputArr[inputArr.length-1])
  // type number
  if (target.className === 'key') {

    // First Number key after typing operator key
    if (flag && realValue === '') {
      screen.display = input
    }

    else if (screen.display === '0' &&  input !== '.') {
      screen.display = input
    } 
    
    else if (input === '.' && screen.display.indexOf('.') !== -1) {}
  
    else {
      screen.display += input
    }

    realValue = screen.display
  }
  
  // clear input and screen
  else if (input === 'AC'){
    screen.display = '0'
    realValue = ''
    inputArr = []
  } 
  
  /* when inputArr become  [Num,Operator,Num]
   *  "=" become a  function exec() trigger  
   *  else it take display as calculate result
   */
  else if (input === '=') {
    inputArr.push(parseFloat(screen.display))

    if (realValue === '' || inputArr.length !== 3) {
      inputArr = []
    } else {
      exec(inputArR)
    }
  }
  
  else {

    if (inputArr.length === 3) {
      exec(inputArr)
    }

    // type operator twice
    else if (flag) {
      inputArr[inputArr.length-1] = input
    } else {
      inputArr.push(parseFloat(screen.display)) 
      realValue = ''
      inputArr.push(input)
    }
  }
}
 

/* core  calculation */

function exec (inputList) {
  let operator = inputList[1]

  switch (operator) {
    case '+': 
      screen.display =  (inputList[0] + inputList[2]).toString()
      break
    case '-': 
      screen.display =  (inputList[0] - inputList[2]).toString()
      break
    case '*':
      screen.display =  (inputList[0] * inputList[2]).toString()
      break
    default :
      screen.display =  (inputList[0] / inputList[2]).toString()
      break
  }
  realValue = screen.display
  inputArr = []
  return screen.display
}