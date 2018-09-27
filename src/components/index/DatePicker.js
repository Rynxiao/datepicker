import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from './picker.css'
import { getDateFormatFromSepecificDate } from '../../utils'
import Modal from '../modal/Modal'
import { CHINESE_MODEL, WESTERN_MODEL, _ } from '../../const'
import { DateContext, initialData } from '../../context'
import { setSelectedDays, getDaysOfMonth, getWeekSort } from '../../helper'

class DatePicker extends Component {
  constructor(props) {
    super(props)
    const { defaultDate } = this.props
    this.state = {
      value: defaultDate,
      showModal: false,
      ...initialData,
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
    this.setState({ showModal: false })
  }

  onInputChange(event) {
    this.setState({ value: event.target.value })
  }

  onInputClear() {
    this.setState({ value: '', showModal: false })
  }

  onChangeModel(model) {
    const { value } = this.state
    let nextModel = model
    if (model === CHINESE_MODEL) {
      nextModel = WESTERN_MODEL
    } else {
      nextModel = CHINESE_MODEL
    }

    const weekTags = getWeekSort(nextModel)
    const changeModelDays = getDaysOfMonth(_, _, nextModel)
    const afterSetDays = setSelectedDays(changeModelDays, value)
    this.setState({
      model: nextModel,
      weekTags: weekTags,
      days: afterSetDays,
    })
  }

  onSelectDay(day) {
    const { days } = this.state
    const afterSetDays = setSelectedDays(days, day.full)
    this.setState({ value: day.full, days: afterSetDays }, () => {
      // this.onModalClose()
    })
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
          />
          <i className={Styles.calendar} />
          <i
            className={Styles.close}
            onClick={this.onInputClear}
            role="presentation"
          />
          <div className={Styles.line} />
        </div>
        <DateContext.Provider
          value={
            {
              ...this.state,
              onSelectDay: this.onSelectDay,
              onChangeModel: this.onChangeModel,
            }
          }
        >
          <Modal
            isMounted={showModal}
            delayTime={200}
            onInputChange={this.onInputChange}
            onCloseModal={this.onModalClose}
            {...this.state}
          />
        </DateContext.Provider>
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
