const MON = '一'
const TUE = '二'
const THR = '三'
const THU = '四'
const FRI = '五'
const STA = '六'
const SUN = '日'

const weekMap = new Map()
weekMap
  .set(0, SUN)
  .set(1, MON)
  .set(2, TUE)
  .set(3, THR)
  .set(4, THU)
  .set(5, FRI)
  .set(6, STA)

export { weekMap }
