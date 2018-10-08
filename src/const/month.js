const JAN = '一月'
const FEB = '二月'
const MAR = '三月'
const APR = '四月'
const MAY = '五月'
const JUN = '六月'
const JUL = '七月'
const AUG = '八月'
const SEP = '九月'
const OCT = '十月'
const NOV = '十一月'
const DEC = '十二月'

const monthMap = new Map()
monthMap
  .set(1, JAN)
  .set(2, FEB)
  .set(3, MAR)
  .set(4, APR)
  .set(5, MAY)
  .set(6, JUN)
  .set(7, JUL)
  .set(8, AUG)
  .set(9, SEP)
  .set(10, OCT)
  .set(11, NOV)
  .set(12, DEC)

export { monthMap }
