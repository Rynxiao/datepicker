import React from 'react'
import PropTypes from 'prop-types'
import Styles from './input.css'
import { DateContext } from '../../context'
import { withContext } from '../../utils'

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }

  componentDidMount() {
    this.textInput.current.focus()
  }

  render() {
    const { context: { value, placeholder, onInputChange } } = this.props

    return (
      <div className={Styles.wrapper}>
        <input
          ref={this.textInput}
          className={Styles.input}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => onInputChange(e)}
        />
      </div>
    )
  }
}

Input.propTypes = {
  context: PropTypes.shape({
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
  }).isRequired,
}

export default withContext(DateContext, Input)
