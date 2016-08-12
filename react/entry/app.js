/**
 * Created by Ryn on 2016/8/7.
 * 入口文件
 */

import '../style/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from '../components/Calendar';

const App = React.createClass({

    /**
     * 初始状态
     * @returns {{tags: number[]}}
     */
    getInitialState() {
        return {
            tags : [5, 21]
        }
    },

    /**
     * 选择日期
     * @param year
     * @param month
     * @param day
     */
    selectDate(year, month, day) {
        console.log("选择时间为：" + year + '年' + month + '月' + day + '日' );
    },

    /**
     * 上一个月
     * @param year
     * @param month
     */
    previousMonth(year, month) {
        console.log("当前日期为：" + year + '年' + month + '月');
        this.setState({tags : [7, 11]});
    },

    /**
     * 下一个月
     * @param year
     * @param month
     */
    nextMonth(year, month) {
        console.log("当前日期为：" + year + '年' + month + '月');
        this.setState({tags : [8, 23]});
    },

    /**
     * 组件渲染
     * @returns {XML}
     */
    render() {
        return (
            <Calendar
                onSelectDate={this.selectDate}
                onPreviousMonth={this.previousMonth}
                onNextMonth={this.nextMonth}
                year="2016"
                month="8"
                day="7"
                tags={this.state.tags} />
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('datePicker')
);

