import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from './picker.css'
import { getDateFormatFromSepecificDate } from '../../utils'
import Modal from '../modal/Modal'
import { CHINESE_MODEL, WESTERN_MODEL } from '../../const'

class DatePicker extends Component {
  constructor(props) {
    super(props)
    const { defaultDate } = this.props
    this.state = {
      value: defaultDate,
      showModal: false,
      model: CHINESE_MODEL,
    }

    this.onModalOpen = this.onModalOpen.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onInputClear = this.onInputClear.bind(this)
    this.onModalClose = this.onModalClose.bind(this)
    this.onChangeModel = this.onChangeModel.bind(this)
    this.onSelectDay = this.onSelectDay.bind(this)
  }

  onModalOpen() {
    this.setState({ showModal: true })
  }

  onModalClose() {
    // this.setState({ showModal: false })
  }

  onInputChange(event) {
    this.setState({ value: event.target.value })
  }

  onInputClear() {
    this.setState({ value: '', showModal: false })
  }

  onChangeModel(model) {
    if (model === CHINESE_MODEL) {
      this.setState({ model: WESTERN_MODEL })
    } else {
      this.setState({ model: CHINESE_MODEL })
    }
  }

  onSelectDay(day) {
    this.setState({ value: day.full })
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
            placeholder="请选择日期"
            className={Styles.input}
            value={value}
            onChange={e => this.onInputChange(e)}
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
        <Modal
          isMounted={showModal}
          delayTime={200}
          onInputChange={this.onInputChange}
          onChangeModel={this.onChangeModel}
          onSelectDay={this.onSelectDay}
          {...this.state}
        />
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
