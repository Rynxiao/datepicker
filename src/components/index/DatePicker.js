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
  CHINESE_MODEL, WESTERN_MODEL, _, INPUT_DEFAULT_PLACEHOLDER,
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
  resetCalendarFromSpecialDay,
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

  /* eslint-disable no-underscore-dangle */
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
    const { value, year, month } = this.state
    let nextModel = model
    if (model === CHINESE_MODEL) {
      nextModel = WESTERN_MODEL
    } else {
      nextModel = CHINESE_MODEL
    }

    const weekTags = getWeekSort(nextModel)
    const changeModelDays = getDaysOfMonth(year, month, nextModel)
    const afterSetDays = setSelectedDays(changeModelDays, value)
    this.setState({
      model: nextModel,
      weekTags: weekTags,
      days: afterSetDays,
    })
  }

  _selectDayCallback = day => {
    const { onSelectDate } = this.props
    this.onModalClose()
    onSelectDate(day)
  }

  onSelectDay = day => {
    const {
      days, value, year, month,
    } = this.state
    const specialDays = resetCalendarFromSpecialDay(days, day.full, value)
    const { changeYear, changeMonth, afterDays } = specialDays
    this.setState({
      days: afterDays,
      year: changeYear === _ ? year : changeYear,
      month: changeMonth === _ ? month : changeMonth,
      value: day.full,
    }, () => this._selectDayCallback(day.full))
  }

  onSelectToday = today => {
    const { days, value } = this.state
    let renderDays = days
    if (!isInCurrentMonth(today, value)) {
      // 不是在【今天】这个月份，需要重新换数据源
      renderDays = initialData.days
    }

    const afterSetDays = setSelectedDays(renderDays, today)
    this.setState({ value: today, days: afterSetDays },
      () => this._selectDayCallback(today))
  }

  _onChangeYearOrMonth = (changeYear, changeMonth) => {
    const { model, year, month } = this.state
    const days = getDaysAfterchangedYearOrMonth(changeYear, changeMonth, model)
    this.setState({
      days: days,
      year: changeYear === _ ? year : changeYear,
      month: changeMonth === _ ? month : changeMonth,
    }, () => {
      // todo bug
      this.forceUpdate()
    })
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
    this._onChangeYearOrMonth(+year + 1, _)
  }

  render() {
    const { inline, placeholder } = this.props
    const { value, showModal } = this.state

    return (
      <div className={`picker-wrapper ${Styles.wrapper}`}>
        <div
          className={Styles.container}
          style={inline ? { display: 'inline-block' } : {}}
        >
          <input
            type="text"
            placeholder={placeholder}
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
              ...this.props,
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
  placeholder: INPUT_DEFAULT_PLACEHOLDER,
  defaultDate: getDateFormatFromSepecificDate(),
  year: getCurrentYear(),
  month: getCurrentMonth(),
}

DatePicker.propTypes = {
  inline: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultDate: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelectDate: PropTypes.func.isRequired,
}

export default DatePicker
