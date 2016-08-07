/**
 * Created by Ryn on 2016/8/6.
 * 帮助函数
 */

var H = (function() {

    // 一些私有变量

    // 一些公有变量、函数

    /**
     *
     * 判断这一年是闰年还是平年
     * @param year {String/Number} 年份
     * @returns {boolean}
     */

    function isLeapYear(year) {
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
    }

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
    function weekOfMonth(date) {
        if (!date) date = new Date();
        return new Date(getFullYear(date), getMonth(date), 1).getDay();
    }

    /**
     * 获取月份
     * @param date
     * @returns {*|number}
     */
    function getMonth(date) {
        if (!date) date = new Date();
        return date.getMonth();
    }

    /**
     * 获取年份
     * @param date
     * @returns {number}
     */
    function getFullYear(date) {
        if (!date) date = new Date();
        return date.getFullYear();
    }

    /**
     * 获取一月中的某一天
     * @param date
     * @returns {number}
     */
    function getDate(date) {
        if (!date) date = new Date();
        return date.getDate();
    }

    // 暴露需要提供的方法
    return {
        isLeapYear : isLeapYear,
        weekOfMonth : weekOfMonth,
        getFullYear : getFullYear,
        getMonth : getMonth,
        getDate : getDate
    }

})();