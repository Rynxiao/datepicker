import React from 'react'
import PropTypes from 'prop-types'
import Styles from './input.css'

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }

  componentDidMount() {
    this.textInput.current.focus()
  }

  render() {
    const { value, onInputChange } = this.props

    return (
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
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
}

export default Input
