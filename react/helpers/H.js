/**
 * Created by Ryn on 2016/8/6.
 * 帮助函数
 */


// 一些私有变量

// 一些公有变量、函数

/**
 *
 * 判断这一年是闰年还是平年
 * @param year {String/Number} 年份
 * @returns {boolean}
 */

export const isLeapYear = function(year) {
    if (!typeof +year === 'number') {
        throw new Error("年份格式不正确");
    }

    if (+year < 1790) {
        throw new Error("年份不能低于1790年");
    }

    // 计算闰年方法
    // 1.能被4整除而不能被100整除
    // 2.能被400整除

    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

/**
 * 返回月份中的第一天是星期几
 * @returns {number}
 * 1 星期一
 * 2 星期二
 * 3 星期三
 * 4 星期四
 * 5 星期五
 * 6 星期六
 * 0 星期天
 */
export const weekOfMonth = function(date) {
    if (!date) date = new Date();
    return new Date(getFullYear(date), getMonth(date), 1).getDay();
};

/**
 * 获取月份
 * @param date
 * @returns {*|number}
 */
export const getMonth = function(date) {
    if (!date) date = new Date();
    return date.getMonth();
};

/**
 * 获取年份
 * @param date
 * @returns {number}
 */
export const getFullYear = function(date) {
    if (!date) date = new Date();
    return date.getFullYear();
};

/**
 * 获取一月中的某一天
 * @param date
 * @returns {number}
 */
export const getDate = function(date) {
    if (!date) date = new Date();
    return date.getDate();
};

export default {
    isLeapYear,
    weekOfMonth,
    getMonth,
    getFullYear,
    getDate
};
