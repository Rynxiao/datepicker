/**
 * Created by Ryn on 2016/8/6.
 * 日历脚本
 */

;(function(document, window, H) {

    // 一些私有变量
    var _date_array = [],                           // 记录每一月有多少天数
        current_day = new Date(),
        current_year = H.getFullYear(current_day),
        current_month = H.getMonth(current_day),
        calendar_elem = null,
        calendar_head = null,
        calendar_body = null,
        icon_left_elem = null,
        icon_right_elem = null,
        week_map = {
            0 : '日',
            1 : '一',
            2 : '二',
            3 : '三',
            4 : '四',
            5 : '五',
            6 : '六'
        };

    // 一些常量
    var MONTH_NUMBER = 12,
        ROW_NUMBER = 6,
        COL_NUMBER = 7;

    /**
     * 给月份数组附上每月天数
     * @param year 年份
     * @private
     */
    function _initMonthDayNumber(year) {
        _date_array = [];

        for (var i = 0; i < MONTH_NUMBER; i++) {
            switch (i + 1) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    _date_array.push(31);
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    _date_array.push(30);
                    break;
                case 2:
                    if (H.isLeapYear(year)) {
                        _date_array.push(29);
                    } else {
                        _date_array.push(28);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * 渲染最外层容器
     * @param outerEle
     * @private
     */
    function _renderContainer(outerEle) {
        calendar_elem = document.createElement('div');
        calendar_elem.className = 'calendar';
        outerEle.appendChild(calendar_elem);
    }

    /**
     * 渲染头部
     * @param date
     * @private
     */
    function _renderHeader(date) {
        calendar_head = document.createElement('div');
        icon_left_elem = document.createElement('i');
        icon_right_elem = document.createElement('i');

        var spanEle = document.createElement('span');

        if (!date) {
            date = current_day;
        }
        var year = H.getFullYear(date);
        var month = H.getMonth(date);

        calendar_head.className = 'calendar-header';
        icon_left_elem.className = 'icon-left';
        icon_right_elem.className = 'icon-right';
        spanEle.textContent = year + ' 年 ' + (month + 1) + ' 月';
        calendar_head.appendChild(icon_left_elem);
        calendar_head.appendChild(spanEle);
        calendar_head.appendChild(icon_right_elem);
        calendar_elem.appendChild(calendar_head);
    }

    /**
     * 渲染内容部分星期汉字
     * @private
     */
    function _renderBodyWeek() {
        calendar_body = document.createElement('div');
        calendar_body.className = 'calendar-body';

        var cBodyHead = document.createElement('ul');
        cBodyHead.className = 'c-body-head';
        for (var i = 0; i < COL_NUMBER; i++) {
            var liEle = document.createElement('li');
            liEle.textContent = week_map[i];
            cBodyHead.appendChild(liEle);
        }
        calendar_body.appendChild(cBodyHead);
        calendar_elem.appendChild(calendar_body);
    }

    /**
     * 渲染具体内容
     * @param date
     * @private
     */
    function _renderBodyDay(date) {

        if (!date) date = current_day;

        var cBodyContent = document.createElement('div'),
            firstDay = H.weekOfMonth(date),
            month = H.getMonth(date),
            current_date = H.getDate(date),
            dayNumber = _date_array[month],
            numberIndex = 0,
            currentMonthIndex = 1,
            preMonthIndex = 1,
            nextMonthIndex = 1;

        cBodyContent.className = 'c-body-content';

        for (var i = 0; i < ROW_NUMBER; i++) {
            var ulRow = document.createElement('ul');
            ulRow.className = 'content-row';

            for (var j = 0; j < COL_NUMBER; j++) {
                var liCol = document.createElement('li'),
                    linkCol = document.createElement('a');
                linkCol.href = 'javascript:;';
                liCol.appendChild(linkCol);

                if (numberIndex < firstDay) {
                    if (month === 0) month = 12;
                    liCol.className += ' item-gray';
                    linkCol.textContent = _date_array[month - 1] - (firstDay - preMonthIndex);
                    ulRow.appendChild(liCol);
                    preMonthIndex++;
                    numberIndex++;
                } else if(numberIndex > dayNumber + firstDay - 1) {
                    liCol.className += ' item-gray';
                    linkCol.textContent = nextMonthIndex;
                    ulRow.appendChild(liCol);
                    nextMonthIndex++;
                    numberIndex++;
                } else {
                    linkCol.className = 'item-link';
                    linkCol.textContent = currentMonthIndex;

                    if (currentMonthIndex === current_date) {
                        liCol.className += ' item-current';
                        linkCol.textContent = '今天';
                    }

                    ulRow.appendChild(liCol);
                    currentMonthIndex++;
                    numberIndex++;
                }
            }
            cBodyContent.appendChild(ulRow);
        }

        calendar_body.appendChild(cBodyContent);
    }

    /**
     * 渲染视图
     */
    function renderUI() {
        _renderContainer(document.getElementById('datePicker'));
        _renderHeader();
        _renderBodyWeek();
        _renderBodyDay();
    }

    /**
     * 删除UI
     * @private
     */
    function _removeUI() {
        calendar_head.remove();
        calendar_body.remove();
    }

    /**
     * 同步视图
     * @param date
     */
    function syncUI(date) {
        _removeUI();
        _initMonthDayNumber(current_year);
        _renderHeader(date);
        _renderBodyWeek();
        _renderBodyDay(date);
        bindEvents();
    }

    /**
     * 绑定事件
     */
    function bindEvents() {
        icon_left_elem.addEventListener('click', function() {
            if (current_month === 0) {
                current_month = 11;
                current_year = current_year - 1;
            } else {
                current_month = current_month - 1;
            }
            syncUI(new Date(current_year, current_month));
        });

        icon_right_elem.addEventListener('click', function() {
            if (current_month === 11) {
                current_month = 0;
                current_year = current_year + 1;
            } else {
                current_month = current_month + 1;
            }
            syncUI(new Date(current_year, current_month));
        });

        var itemLinks = document.getElementsByClassName('item-link'),
            linksArray = Array.prototype.slice.call(itemLinks);

        for (var i = 0; i < linksArray.length; i++) {
            linksArray[i].addEventListener('click', function(e) {
                e.preventDefault();
                var activeLinks = document.getElementsByClassName('item-current'),
                activeArray = Array.prototype.slice.call(activeLinks);
                for (var j = 0; j < activeArray.length; j++) {
                    activeArray[j].className = activeArray[j].className.replace(/item-current/, '');

                }
                this.parentNode.className += ' item-current';
                alert("当前日期为：" + current_year + '年' + (current_month + 1) + '月' + this.textContent + '日' );
            });
        }

    }

    function init() {
        _initMonthDayNumber(current_year);
        renderUI();
        bindEvents();
    }

    init();

})(document, window, H);