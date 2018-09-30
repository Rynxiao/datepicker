
import React from 'react'
import ReactDOM from 'react-dom'
import DatePicker from './index'

const App = () => (
  <DatePicker
    disable
    defaultDate="2018-01-31"
    placeholder="please choose date"
    onSelectDate={day => console.log(day)}
  />
)
ReactDOM.render(<App />, document.getElementById('container'))
