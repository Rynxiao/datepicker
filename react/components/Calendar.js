/**
 * Created by Ryn on 2016/8/7.
 * 日历组件
 */

import React from 'react';
import H from '../helpers/H';

const Calendar = React.createClass({

    /**
     * 默认的属性
     */
    getDefaultProps() {
        return {
            row_number : 6,
            col_number : 7
        }
    },

    /**
     * 组件初始化状态
     */
    getInitialState() {
        return {
            current_year : H.getFullYear(),
            current_month : H.getMonth(),
            current_day : H.getDate(),
            select_year : H.getFullYear(),
            select_month : H.getMonth(),
            select_day : H.getDate(),
            history_year : undefined,
            history_month : undefined,
            history_day : undefined,
            date_num_array : []
        }
    },

    componentWillReceiveProps(nextProps) {
        // todo
    },

    /**
     * 组件渲染完后执行
     */
    componentDidMount() {
        let { year, month, day} = this.props;

        // 初始化状态
        if(year && month && day) {
            let date_num_array = this._initMonthDayNumber(year),
                first_day = H.weekOfMonth(new Date(year, month - 1));

            this.setState({
                select_year : year,
                select_month : month - 1,
                select_day : day,
                date_num_array : date_num_array,
                first_day : first_day
            });
        }
    },

    /**
     * 给月份数组附上每月天数
     * @param year 年份
     * @private
     */
    _initMonthDayNumber(year) {
        let _date_array = [];

        for (var i = 0; i < 12; i++) {
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

        return _date_array;
    },

    /**
     * 组件将要挂载
     * 设置月份数组以及计算出每月的第一天星期几
     */
    componentWillMount() {
        let date_num_array = this._initMonthDayNumber(this.state.current_year),
            first_day = H.weekOfMonth();

        this.setState({date_num_array : date_num_array, first_day : first_day});
    },

    /**
     * 日期选择
     * @param s_day
     */
    selectDate(s_day) {
        let { select_year, select_month} = this.state;
        this.setState({
            history_year : select_year,
            history_month : select_month,
            history_day : s_day,
            select_day : s_day
        }, () => {
            this.props.onSelectDate(select_year, select_month + 1, s_day);
        });
    },

    /**
     * 前一个月
     */
    previousMonth() {
        let { current_year, current_month, current_day,
            select_year, select_month, select_day, date_num_array, first_day} = this.state;

        if (select_month === 0) {
            select_year = +select_year - 1;
            select_month = 11;
            date_num_array = this._initMonthDayNumber(select_year);
        } else {
            select_month = +select_month - 1;
        }

        first_day = H.weekOfMonth(new Date(select_year, select_month));

        if (current_year === select_year &&
            current_month === select_month) {
            select_day = current_day;
        } else {
            select_day = undefined;
        }

        this.setState({
            select_year : select_year,
            select_month : select_month,
            select_day : select_day,
            date_num_array : date_num_array,
            first_day : first_day
        }, () => {
            this.props.onPreviousMonth(select_year, select_month + 1);
        })
    },

    /**
     * 之后一个月
     */
    nextMonth() {
        let { current_year, current_month, current_day,
            select_year, select_month, select_day, date_num_array, first_day} = this.state;

        if (select_month === 11) {
            select_year = +select_year + 1;
            select_month = 0;
            date_num_array = this._initMonthDayNumber(select_year);
        } else {
            select_month = +select_month + 1;
        }

        first_day = H.weekOfMonth(new Date(select_year, select_month));

        if (current_year === select_year &&
            current_month === select_month) {
            select_day = current_day;
        } else {
            select_day = undefined;
        }

        this.setState({
            select_year : select_year,
            select_month : select_month,
            select_day : select_day,
            date_num_array : date_num_array,
            first_day : first_day
        }, () => {
            this.props.onNextMonth(select_year, select_month + 1);
        })
    },

    /**
     * 渲染页面
     * @returns {XML}
     */
    render() {

        let { row_number, col_number, tags } = this.props;
        let { current_year, current_month, current_day,
            select_year, select_month, select_day,
            history_year, history_month, history_day,
            date_num_array, first_day} = this.state;

        let month_day = date_num_array[select_month],
            n_day = row_number * col_number - first_day - month_day,
            previous_month_days = undefined,
            previous_days = [],
            current_days = [],
            next_days = [],
            total_days = [],
            previous_month = undefined;

        if (select_month === 0) {
            previous_month = 11;
        } else {
            previous_month = select_month - 1;
        }

        previous_month_days = date_num_array[previous_month];
        for (let i = 0; i < first_day; i++) {
            let previous_link = (<li className="item-gray" key={'previous'+i}>
                <a href="javascript:;">{previous_month_days - (first_day - i) + 1}</a>
            </li>);
            previous_days.push(previous_link);
        }

        let currentClassName = '',
            currentText = '';
        for (let i = 0; i < month_day; i++) {

            // 今天样式
            if (current_year == select_year && current_month == select_month && current_day == (i + 1)) {
                currentClassName = 'item-current';
                currentText = '今天';
            } else {
                currentText = i + 1;

                // 判断选择样式与历史样式是否相等，相等激活
                if (select_year == history_year && select_month == history_month && history_day == (i + 1)) {
                    currentClassName = 'item-active';
                } else {
                    currentClassName = '';
                }
            }

            // 添加tag样式
            if (tags.length > 0) {
                for (let j = 0; j < tags.length; j++) {
                    if ((i + 1) === tags[j]) {
                        currentClassName += ' item-tag';
                        break;
                    }
                }
            }

            let current_link = (<li className={currentClassName} key={'current'+i}>
                <a href="javascript:;" onClick={this.selectDate.bind(this, i + 1)}>
                    {currentText}
                </a>
            </li>);
            current_days.push(current_link);
        }

        for (let i = 0; i < n_day; i++) {
            let next_link = (<li className="item-gray" key={'next'+i}>
                <a href="javascript:;">{i + 1}</a>
            </li>);
            next_days.push(next_link);
        }

        total_days = previous_days.concat(current_days, next_days);

        let ul_list = [];
        if (total_days.length > 0) {
            for (let i = 0; i < row_number; i++) {
                let li_list = [],
                    start_index = i * col_number,
                    end_index = (i + 1) * col_number;
                for (let j = start_index; j < end_index; j++) {
                    li_list.push(total_days[j]);
                }
                ul_list.push(li_list);
            }
        }

        return (
            <div className="calendar">
                <div className="calendar-header">
                    <i className="icon-left" onClick={this.previousMonth}></i>
                    <span>{select_year} 年 {select_month + 1} 月</span>
                    <i className="icon-right" onClick={this.nextMonth}></i>
                </div>
                <div className="calendar-body">
                    <ul className="c-body-head">
                        <li>日</li>
                        <li>一</li>
                        <li>二</li>
                        <li>三</li>
                        <li>四</li>
                        <li>五</li>
                        <li>六</li>
                    </ul>
                    <div className="c-body-content">
                        {
                            ul_list.map((u, index) => {
                                return (<ul key={'ul'+index} className="content-row">{u}</ul>);
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
});

export default Calendar;