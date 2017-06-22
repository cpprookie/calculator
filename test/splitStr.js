function exec (str) {
  //sterp1 将字符串分割为实际数据与操作符的集合
  debugger
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
  console.log(splitedArr)
  return splitedArr
}

// exec('1+2')

// exec('1+2-3')

// exec('1/4*6+2-3*3')

// exec('10+2')

// exec('10+20')

// exec('0.1+0.2')

// exec('1+2*3-10/234+0.1-0.3*32')

// exec('-1+2')