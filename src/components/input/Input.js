import React from 'react'
import Styles from './input.css'
import { DateContext } from '../../context'

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }

  componentDidMount() {
    this.textInput.current.focus()
  }

  render() {
    return (
      <DateContext.Consumer>
        {
          ({ value, onInputChange }) => (
            <div className={Styles.wrapper}>
              <input
                ref={this.textInput}
                className={Styles.input}
                type="text"
                placeholder="请选择日期"
                value={value}
                onChange={e => onInputChange(e)}
              />
            </div>
          )
        }
      </DateContext.Consumer>
    )
  }
}

export default Input
