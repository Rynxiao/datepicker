
import React from 'react'
import ReactDOM from 'react-dom'
import DatePicker from './index'

const App = () => (
  <DatePicker
    defaultDate="2018-01-01"
    placeholder="please choose date"
    onSelectDate={day => console.log(day)}
  />
)
ReactDOM.render(<App />, document.getElementById('container'))
