/*
 * Event binding
 * produce an input array  
 */
function dataPrepare() {
  document.querySelector()
}
 

/* core  calculation */

function exec (inputArr) {
  let operator = inputArr[1]
  switch (operator) {
    case '+': 
      return parseFloat(inputArr[0]) + parseFloat(inputArr[2])
    case '-': 
      return parseFloat(inputArr[0]) - parseFloat(inputArr[2])
    case '*':
      return parseFloat(inputArr[0]) * parseFloat(inputArr[2])
    default :
      return parseFloat(inputArr[0]) / parseFloat(inputArr[2])
  }
}