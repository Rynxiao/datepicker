import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Styles from './picker.css'
import { getDateFormatFromSepecificDate } from '../../utils'

class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputFocus: false,
    }

    this.onInputFocus = this.onInputFocus.bind(this)
    this.onInputBlur = this.onInputBlur.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputFocus() {
    this.setState({ inputFocus: true })
  }

  onInputChange() {
    console.log('change')
  }

  onInputBlur() {
    this.setState({ inputFocus: false })
  }

  render() {
    const { inline, defaultDate } = this.props
    const { inputFocus } = this.state

    return (
      <div
        className={Styles.container}
        style={inline ? { display: 'inline-block' } : {}}
      >
        <input
          type="text"
          className={Styles.input}
          value={defaultDate}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          onChange={this.onInputChange}
        />
        <i className={Styles.calendar} />
        <i className={Styles.close} />
        <div className={classNames(Styles.line, { [Styles.inputFocus]: inputFocus })} />
      </div>
    )
  }
}

DatePicker.defaultProps = {
  inline: false,
  defaultDate: getDateFormatFromSepecificDate(),
}

DatePicker.propTypes = {
  inline: PropTypes.bool,
  defaultDate: PropTypes.string,
}

export default DatePicker
