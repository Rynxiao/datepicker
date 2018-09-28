import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from './picker.css'
import {
  getDateFormatFromSepecificDate,
  getCurrentYear,
  getCurrentMonth,
  isDateValid,
} from '../../utils'
import Modal from '../modal/Modal'
import {
  CHINESE_MODEL, WESTERN_MODEL, _, noop,
} from '../../const'
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
import '../../utils/closest-polyfill'

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

  componentDidMount() {
    document.addEventListener('click', event => {
      if (event.target.closest('.picker-wrapper')) {
        return
      }

      const { value } = this.state
      if (!isDateValid(value)) {
        this.onSelectToday(getDateFormatFromSepecificDate())
      } else {
        this.onModalClose()
      }
    })
  }

  onModalOpen = () => {
    this.setState({ showModal: true })
  }

  onModalClose = () => {
    this.setState({ showModal: false })
  }

  onInputChange = event => {
    const val = event.target.value
    this.setState({ value: val }, () => {
      if (!val || isDateValid(val)) {
        const { days } = this.state
        const afterSetDays = setSelectedDays(days, val)
        this.setState({ days: afterSetDays })
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

  _onChangeYearOrMonth = (
    changeYear,
    changeMonth,
    callback = noop,
    format,
  ) => {
    const {
      model, value, year, month,
    } = this.state
    const dayFormat = format || value
    const days = getDaysAfterchangedYearOrMonth(changeYear, changeMonth, model)
    const afterSetDays = setSelectedDays(days, dayFormat)
    this.setState({
      days: afterSetDays,
      year: changeYear === _ ? year : changeYear,
      month: changeMonth === _ ? month : changeMonth,
      value: dayFormat,
    }, () => {
      callback()
    })
  }

  onSelectDay = day => {
    const { days, value } = this.state
    if (!isInCurrentMonth(day.full, value)) {
      const year = day.full.substring(0, 4)
      const month = day.full.substring(5, 7)
      /* eslint-disable no-underscore-dangle */
      this._onChangeYearOrMonth(year, month, () => this.onModalClose(), day.full)
    } else {
      const afterSetDays = setSelectedDays(days, day.full)
      this.setState({ value: day.full, days: afterSetDays }, () => this.onModalClose())
    }
  }

  onSelectToday = today => {
    const { days } = this.state
    let renderDays = days
    if (!isInCurrentMonth(today)) {
      // 不是在【今天】这个月份，需要重新换数据源
      renderDays = initialData.days
    }

    const afterSetDays = setSelectedDays(renderDays, today)
    this.setState({ value: today, days: afterSetDays }, () => this.onModalClose())
  }

  onPrevMonth = () => {
    const { year, month } = this.state
    const yearAndMonth = getPrevYearAndMonth(year, month)
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
      <div className={`picker-wrapper ${Styles.wrapper}`}>
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
            onFocus={e => this.onModalOpen(e)}
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
              onInputChange: this.onInputChange,
            }
          }
        >
          <Modal
            isMounted={showModal}
            delayTime={200}
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
