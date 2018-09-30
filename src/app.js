
import React from 'react'
import ReactDOM from 'react-dom'
import DatePicker from './index'

const disabledDate = current => (
  // start & end
  // ['2018-01-02', current]

  // end
  [current]
)

const App = () => (
  <DatePicker
    // disable
    disabledDate={current => disabledDate(current)}
    defaultDate="2018-01-31"
    placeholder="please choose date"
    onSelectDate={day => console.log(day)}
  />
)
ReactDOM.render(<App />, document.getElementById('container'))
