/**
 * Created by Ryn on 2016/8/7.
 * 入口文件
 */

import '../style/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from '../components/Calendar';

const App = React.createClass({
    selectDate(year, month, day) {
        alert("当前日期为：" + year + '年' + month + '月' + day + '日' );
    },
    render() {
        return (
            <Calendar onSelectDate={this.selectDate} year="2016" month="8" day="7" tags={[5, 21]} />
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('datePicker')
);

