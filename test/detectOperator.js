function findOperator (arr) {

  var result = 0

  // 乘除法优先级高，先检索乘、除号做运算
  if (arr.includes('*') || arr.includes('/')) {

    for (var i = 0; i < arr.length; i++) {
      // 当数组规模塌缩为3时，直接进行最后一次运算
      if (arr.length ===  3) {
        result = stupidCompute(arr[0], arr[1], arr[2])
        break
      }
      debugger
      if (arr[i] === '*' || arr[i] === '/') {
        var computed = stupidCompute(arr[i-1], arr[i], arr[i+1])
        arr.splice(i-1,3,computed)
        i--
      }
    }  
  }

  // 加减法运算
  for (var i = 0; i < arr.length; i++) {
    if (arr.length ===  3) {
      result = stupidCompute(arr[0], arr[1], arr[2])
      break
    }

    if (arr[i] === '+' || arr[i] === '-') {
    debugger
      var computed = stupidCompute(arr[i-1], arr[i], arr[i+1])
      arr.splice(i-1,3,computed)
      i--
    }
  }
  console.log(result)
}

function stupidCompute(number1, operator, number2) {

  switch(operator) {
    case '+' :
      return number1 + number2
    case '-' :
      return number1 - number2
    case '*' :
      return number1 * number2
    case '/' :
      return number1 / number2
  }
}


// findOperator([1,'/', 2, '+',3])

// findOperator([1,'/', 2, '+',3 , '*' , 5 , '-', 3])

// findOperator([1,'+', 2, '*',3 , '-', 3])

// findOperator([1,'+', 2, '+',3 , '-', 3])

// findOperator([1,'*', 2, '/',4 , '*', 0.3])

findOperator([1,'+', 2, '+',3 , '-', 3, '*', 3,'/',6 ,'*', 0.2])