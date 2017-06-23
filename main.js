
window.onload = function () {
  var container = document.querySelector('.container'),
         screen = document.querySelector('.display'),
         number = document.querySelector('.number-key'),
       operator = document.querySelector('.operator-key'),
             ac = document.querySelector('#ac'),
            del = document.querySelector('#del')

  if(!container || !screen || !number || !operator || !ac || !del) {
    console.log("Didn't find dom element as expected!")
    return false
  }          

  // container.addEventListener('click', function () {
  //   action(event,calculator)
  // })

  var calculator = {
    _value: '',
    lastKey: '',
    get value () {
      return this._value
    },
    set value (val) {
      // DOM 绑定，每次_value的值变化都会触发DOM刷新
      screen.textContent = val
      this._value = val
    }
  }

  // 监听按键点击
  container.addEventListener('click', action.bind(calculator))
}


/* event listener */
 function action (event) {
  var target = event.target,
      className = target.className,
      key = target.textContent,
      self = this

  switch(className) {
    case "number-key": 
      // 避免出现 连续多个0的情况
      if(self.value === '0' && key === '0') {
        return false
      }
      self.value += key
    break

    case "operator-key": 
      if(self.lastKey.keyValue === key) {
        return false
      } 
      self.value += key 
    break
    
    case "function-key": 
      // 清空全部状态
      if(key === 'AC') {
        self.value = ''
        self.lastKey = ''
      } else {
        // 后退至上一步操作
        var length = self.value.length
        self.value = length === 0 ? '' : self.value.slice(0, -1)
        self.lastKey = self.value[length-1]
      }
    break
 
    //  在按下等号键的时候判断输入并触发整个计算流程。
    case "equal-key": 
      if (exec(self.value)) {
        self.value = exec(self.value).toString()
      } else {
        ac.click()  //此次计算终结，清空状态值
        document.querySelector('.display').textContent = "0 can't set as divisor"
      }
    break
  }

 // 处理完输入后，更新lastKey
self.lastKey = key
}
 
/* core  calculation */

function exec (str) {
  var splitArr = splitStr(str),
        result = findOperator(splitArr)
  return  result ? result : false
}


//sterp1 将字符串分割为实际数据与操作符的集合
function splitStr (str) {
  var operators = ['+', '-', '*', '/'],
          start = 0,  // 数据的起始位置
            end = 0,  // 数据的终点位置 
     splitedArr = []  // 映射的目标数组

  if (operators.includes(str[0])) {
    splitedArr.push(str[0])
    str = str.slice(1)
  }

  for(var i = 0, n = str.length; i < n; i++) {
    if (operators.includes(str[i])) {
      start = end === 0 ? 0  : end + 1 
      end = i
      splitedArr.push(parseFloat(str.slice(start, end)))
      splitedArr.push(str[i])
    } 

    if (i === n - 1) {
      splitedArr.push(parseFloat(str.slice(end+1)))
    }
  }
  return splitedArr
}


 /*
  * 识别运算符并逐3个进行计算
  *  保证乘除法优先级
  */ 
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
      // debugger
      if (arr[i] === '*' || arr[i] === '/') {
        var computed = stupidCompute(arr[i-1], arr[i], arr[i+1])

        // 除数为0时，打破函数链
        if (computed === false) {
          return false
        }

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
    // debugger
      var computed = stupidCompute(arr[i-1], arr[i], arr[i+1])
      arr.splice(i-1,3,computed)
      i--
    }
  }
  return result
}



//  执行最基本的运算
function stupidCompute(number1, operator, number2) {

  switch(operator) {
    case '+' :
      return number1 + number2
    case '-' :
      return number1 - number2
    case '*' :
      return number1 * number2
    case '/' :
      if (number2 === 0) {
        return  false
      }
      return number1 / number2
  }
}