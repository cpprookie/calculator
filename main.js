
window.onload = function () {
  var domQuery = document.querySelector

  var contanier = domQuery('.container'),
        screen = domQuery('.display'),
         number = domQuery('.number-key'),
       operator = domQuery('.operator'),
             ac = domQuery('#ac'),
            del = domQuery('del')

  if(!contanier || !diaplay || !number || !operator || !ac || !del) {
    consoe.log("Didn't find dom element as expected!")
    return false
  }          

  contanier.addEventListener('click', action.bind(calculator))

  var calculator = {
    _value: '0',
    lastKey: '0',

    get display () {
      return this._value
    },

    set display (val) {
      // DOM 绑定，每次_value的值变化都会触发DOM刷新
      screen.textContent = val
      this._value = val
    }
  }
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
        self._value = '0'

        self.lastKey = '0'
      } else {
        var length = self.value.length

        self.value = length === 1 ? '0' : self.value.substr(0, --length)
        self.lastKey = self.value[length-1]
      }
    break
 
    case "equal-key": 
      exec.apply(self)
    break
  }

  console.log(self.value)

  // 处理完输入后，更新lastKey
  self.lastKey = key
}
 
/* core  calculation */

function exec (str) {
  var splitArr = splitStr(str)
  
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
      splitedArr.push(str.slice(start, end))
      splitedArr.push(str[i])
    } 

    if (i === n - 1) {
      splitedArr.push(str.slice(end+1))
    }
  }
  return splitedArr
}



function stupidCompute(arr) {
  var result = 0;

  switch(arr[1]) {
    case '+' :
      result = arr[0] + arr[2]
      break;
    case '-' :
      result = arr[0] - arr[2]
      break;
    case '*' :
      result = arr[0] * arr[2]
      break;
    case '/' :
      result = arr[0] / arr[2]
      break;  

  }
}