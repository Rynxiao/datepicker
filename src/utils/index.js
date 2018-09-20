import warnning from './warning'

/**
 * 判断这一年是平年还是闰年
 * @param {String/Number} year 年份
 */
export const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)

/**
 * 去掉字符串首尾空格
 * @param {String} str 字符串
 */
export const trimStr = str => str.replace(/^\s*/).replace(/\s*$/)

export const formatDate = date => {
  if (typeof date !== 'string') {
    warnning('date should be string')
    return
  }

  const strArr = trimStr(date).match(/^(\d{4})(\s*[/-\\]\s*)?(\d{2})(\s*[/-\\]\s*)?(\d{2})/)
  console.log(strArr)
}

/**
 * 获取日期中的年份
 * @param {String} date 日期
 */
export const getYear = date => formatDate(date).substr(0, 4)
