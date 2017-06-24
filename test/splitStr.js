function splitStr (str) {
  //sterp1 将字符串分割为实际数据与操作符的集合
  var operators = ['+', '-', '*', '/'],
          start = new Number,  // 数据的起始位置
            end = 0,  // 数据的终点位置 
     splitedArr = []  // 映射的目标数组

  for(var i = 0, n = str.length; i < n; i++) {

    if (operators.includes(str[i])) {
      start = end === 0 ? 0  : end + 1 
      end = i
      if (i === 0)  continue   // 第一个字符为操作符时，结束当前循环
      splitedArr.push(parseFloat(str.slice(start, end)))
      splitedArr.push(str[i])
    } 

    // 推入最后一个数据
    if (i === n - 1) {
      splitedArr.push(parseFloat(str.slice(end+1)))
    }
  }
  console.log(splitedArr)
  return splitedArr
}

// splitStr('1+2')

// splitStr('1+2-3')

// splitStr('1/4*6+2-3*3')

// splitStr('10+2')

// splitStr('10+20')

// splitStr('0.1+0.2')

// splitStr('1+2*3-10/234+0.1-0.3*32')

// splitStr('-1+2')

   splitStr('-0.0001+1')