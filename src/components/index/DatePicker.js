import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from './picker.css'
import {
  getDateFormatFromSepecificDate,
  getCurrentYear, getCurrentMonth,
  isDateValid,
  // getCurrentDate,
} from '../../utils'
import Modal from '../modal/Modal'
import { CHINESE_MODEL, WESTERN_MODEL, _ } from '../../const'
import { DateContext, initialData } from '../../context'
import {
  setSelectedDays,
  getDaysOfMonth,
  getWeekSort,
  getDaysAfterchangedYearOrMonth,
  getPrevYearAndMonth,
  getNextYearAndMonth,
  isInCurrentMonth,
} from '../../helper'

class DatePicker extends Component {
  constructor(props) {
    super(props)
    const { defaultDate, year, month } = this.props
    this.state = {
      year: year,
      month: month,
      value: defaultDate,
      showModal: false,
      ...initialData,
    }
  }

  onModalOpen = () => {
    this.setState({ showModal: true })
  }

  onModalClose = () => {
    this.setState({ showModal: false })
  }

  onInputChange = event => {
    const val = event.target.value
    // console.log(val)
    this.setState({ value: val }, () => {
      // console.log(isDateValid(val))
      if (isDateValid(val)) {
        // this.onSelectDay(val)
      } else {
        // this.onSelectToday(getCurrentDate())
      }
    })
  }

  onInputClear = () => {
    this.setState({ value: '', showModal: false })
  }

  onChangeModel = model => {
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

  onSelectDay = day => {
    const { days } = this.state
    const afterSetDays = setSelectedDays(days, day.full)
    this.setState({ value: day.full, days: afterSetDays }, () => {
      this.onModalClose()
    })
  }

  onSelectToday = today => {
    const { days } = this.state
    let renderDays = days
    if (!isInCurrentMonth(today)) {
      // 不是在【今天】这个月份，需要重新换数据源
      renderDays = initialData.days
    }

    const afterSetDays = setSelectedDays(renderDays, today)
    this.setState({ value: today, days: afterSetDays }, () => {
      this.onModalClose()
    })
  }

  _onChangeYearOrMonth = (changeYear, changeMonth) => {
    const {
      model,
      value,
      year,
      month,
    } = this.state
    const days = getDaysAfterchangedYearOrMonth(changeYear, changeMonth, model)
    const afterSetDays = setSelectedDays(days, value)
    this.setState({
      days: afterSetDays,
      year: changeYear === _ ? year : changeYear,
      month: changeMonth === _ ? month : changeMonth,
    })
  }

  onPrevMonth = () => {
    const { year, month } = this.state
    const yearAndMonth = getPrevYearAndMonth(year, month)
    /* eslint-disable no-underscore-dangle */
    this._onChangeYearOrMonth(yearAndMonth.year, yearAndMonth.month)
  }

  onPrevYear = () => {
    const { year } = this.state
    this._onChangeYearOrMonth(year - 1, _)
  }

  onNextMonth = () => {
    const { year, month } = this.state
    const yearAndMonth = getNextYearAndMonth(year, month)
    this._onChangeYearOrMonth(yearAndMonth.year, yearAndMonth.month)
  }

  onNextYear = () => {
    const { year } = this.state
    this._onChangeYearOrMonth(year + 1, _)
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
              onSelectToday: this.onSelectToday,
              onChangeModel: this.onChangeModel,
              onPrevMonth: this.onPrevMonth,
              onPrevYear: this.onPrevYear,
              onNextMonth: this.onNextMonth,
              onNextYear: this.onNextYear,
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
  year: getCurrentYear(),
  month: getCurrentMonth(),
}

DatePicker.propTypes = {
  inline: PropTypes.bool,
  defaultDate: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default DatePicker
