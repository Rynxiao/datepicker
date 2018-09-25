import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from './picker.css'
import { getDateFormatFromSepecificDate } from '../../utils'
import Modal from './Modal'

class DatePicker extends Component {
  constructor(props) {
    super(props)
    const { defaultDate } = this.props
    this.state = {
      value: defaultDate,
      showModal: false,
    }

    this.onModalOpen = this.onModalOpen.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onInputClear = this.onInputClear.bind(this)
    this.onModalClose = this.onModalClose.bind(this)
  }

  onModalOpen() {
    this.setState({ showModal: true })
  }

  onModalClose() {
    this.setState({ showModal: false })
  }

  onInputChange() {
    console.log('onInputChange')
  }

  onInputClear() {
    this.setState({ value: '', showModal: false })
  }

  render() {
    const { inline } = this.props
    const { value, showModal } = this.state

    return (
      <div className={Styles.wrapper}>
        <div
          className={Styles.container}
          style={inline ? { display: 'inline-block' } : {}}
        >
          <input
            type="text"
            placeholder="选择日期"
            className={Styles.input}
            value={value}
            onChange={this.onInputChange}
            onFocus={this.onModalOpen}
            onBlur={this.onModalClose}
          />
          <i className={Styles.calendar} />
          <i
            className={Styles.close}
            onClick={this.onInputClear}
            role="presentation"
          />
          <div className={Styles.line} />
        </div>
        <Modal isMounted={showModal} delayTime={200} />
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
