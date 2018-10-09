
import React from 'react'
import ReactDOM from 'react-dom'
// import DatePicker from './index'
import DatePicker from '../lib'
import '../src/styles/index.css'

const { MonthPicker } = DatePicker

// const disabledDate = current => (
// start & end
// ['2018-01-02', current]

// end
// [current]
// )

const App = () => (
  <React.Fragment>
    <p>日历模式</p>
    <DatePicker
      inline
      // disabledDate={current => disabledDate(current)}
      defaultDate="2018-01-31"
      placeholder="please choose date"
      onSelectDate={day => console.log(day)}
    />
    <p>月份选择模式</p>
    <MonthPicker
      inline
      placeholder="Select month"
      year="2018"
      month="01"
      onSelectMonth={month => console.log(month)}
    />
  </React.Fragment>
)
ReactDOM.render(<App />, document.getElementById('container'))
