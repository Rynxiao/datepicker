import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Styles from './picker.css'
import {
  getDateFormatFromSepecificDate,
  getCurrentYear,
  getCurrentMonth,
  isDateValid,
  getCurrentDate,
  formatMonthOrDay,
} from '../../utils'
import Modal from '../modal/Modal'
import {
  CHINESE_MODEL,
  WESTERN_MODEL,
  _,
  INPUT_DEFAULT_PLACEHOLDER,
  noop,
  MONTH_MODE,
  MONTH_DECADE_MODE,
} from '../../const'
import { DateContext, initialData } from '../../context'
import {
  getDaysOfMonth,
  getWeekSort,
  getDaysAfterchangedYearOrMonth,
  getPrevYearAndMonth,
  getNextYearAndMonth,
  isInCurrentMonth,
  resetCalendarFromSpecialDay,
} from '../../helper'

/* eslint-disable no-underscore-dangle */
class DatePicker extends Component {
  constructor(props) {
    super(props)
    const { defaultDate, year, month } = this.props
    this.state = {
      year: year,
      month: month,
      value: defaultDate,
      showModal: false,
      showMonthModal: false,
      decade: year,
      mode: MONTH_MODE,
      monthValue: `${year}-${formatMonthOrDay(month)}`,
      ...initialData,
    }
  }

  componentDidMount() {
    const { value } = this.state
    this._onInitialDefaultDay({ full: value })
    this._addGlobalClickListener()
  }

  componentWillUnmount() {
    this._removeGlobalClickListener()
  }

  onModalOpen = () => {
    this.setState({ showModal: true })
  }

  onModalClose = () => {
    this.setState({ showModal: false })
  }

  _setDateFromSepcialDay = ({
    originDays,
    setDay,
    currentDay,
    model,
    callback,
    setYear,
    setMonth,
  }, extralState) => {
    const { days, year, month } = this.state
    const { disabledDate } = this.props
    const range = disabledDate(getCurrentDate())
    const specialDays = resetCalendarFromSpecialDay(originDays || days,
      setDay, currentDay, model, range)
    let { changeYear, changeMonth } = specialDays
    const { afterDays } = specialDays

    if (setYear) {
      changeYear = setYear
    }

    if (setMonth) {
      changeMonth = setMonth
    }
    this.setState({
      days: afterDays,
      year: changeYear === _ ? year : changeYear,
      month: changeMonth === _ ? month : changeMonth,
      value: setDay,
      ...extralState,
    }, () => {
      callback && callback()
    })
  }

  onInputChange = event => {
    const val = event.target.value
    this.setState({ value: val }, () => {
      if (!val || isDateValid(val)) {
        this._setDateFromSepcialDay({ setDay: val })
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
    this._setDateFromSepcialDay(
      { originDays: changeModelDays, setDay: value, currentDay: value },
      { model: nextModel, weekTags: weekTags },
    )
  }

  _selectDayCallback = day => {
    const { onSelectDate } = this.props
    this.onModalClose()
    onSelectDate(day)
  }

  onSelectDay = day => {
    const { days, value } = this.state
    this._setDateFromSepcialDay({
      originDays: days,
      setDay: day.full,
      currentDay: value,
      callback: () => this._selectDayCallback(day.full),
    })
  }

  onSelectToday = today => {
    const { days, value } = this.state
    let renderDays = days

    if (!isInCurrentMonth(today, value)) {
      // 不是在【今天】这个月份，需要重新换数据源
      renderDays = initialData.days
    }

    this._setDateFromSepcialDay({
      originDays: renderDays,
      setDay: today,
      currentDay: value,
      callback: () => this._selectDayCallback(today),
    })
  }

  _onChangeYearOrMonth = (changeYear, changeMonth) => {
    const { model, value } = this.state
    const days = getDaysAfterchangedYearOrMonth(changeYear, changeMonth, model)
    this._setDateFromSepcialDay({
      originDays: days,
      setDay: value,
      currentDay: value,
      setYear: changeYear,
      setMonth: changeMonth,
    })
  }

  onPrevMonth = () => {
    const { year, month } = this.state
    const yearAndMonth = getPrevYearAndMonth(year, month)
    this._onChangeYearOrMonth(yearAndMonth.year, yearAndMonth.month)
  }

  onPrevYear = () => {
    const { year, month } = this.state
    this._onChangeYearOrMonth(year - 1, month)
  }

  onNextMonth = () => {
    const { year, month } = this.state
    const yearAndMonth = getNextYearAndMonth(year, month)
    this._onChangeYearOrMonth(yearAndMonth.year, yearAndMonth.month)
  }

  onNextYear = () => {
    const { year, month } = this.state
    this._onChangeYearOrMonth(+year + 1, month)
  }

  onMonthModalOpen = mode => {
    this.setState({ mode: mode, showMonthModal: true })
  }

  onMonthModalClose = () => {
    this.setState({ showMonthModal: false })
  }

  onChangeMode = mode => {
    if (mode === MONTH_MODE) {
      this.setState({ mode: MONTH_DECADE_MODE })
    }
  }

  onSelectYearOrMonth = val => {
    const { mode } = this.state
    if (mode === MONTH_DECADE_MODE) {
      this.setState({ mode: MONTH_MODE, year: val, decade: val })
    } else {
      const { year } = this.state
      this.setState({ month: val, monthValue: `${year}-${formatMonthOrDay(val)}` }, () => {
        this._onChangeYearOrMonth(year, val)
        this.onMonthModalClose()
      })
    }
  }

  onPrev = () => {
    const { mode } = this.state
    if (mode === MONTH_DECADE_MODE) {
      const { decade } = this.state
      this.setState({ decade: +decade - 10 })
    } else {
      const { year } = this.state
      this.setState({ year: +year - 1, decade: +year - 1 })
    }
  }

  onNext = () => {
    const { mode } = this.state
    if (mode === MONTH_DECADE_MODE) {
      const { decade } = this.state
      this.setState({ decade: +decade + 10 })
    } else {
      const { year } = this.state
      this.setState({ year: +year + 1, decade: +year + 1 })
    }
  }

  _addGlobalClickListener() {
    this.globalClickListener = document.addEventListener('click', event => {
      if (event.target.closest('.picker-wrapper')) {
        return
      }

      // hack
      const cNames = event.target.className
      const { mode } = this.state
      if (cNames.includes('month__td') && mode === MONTH_MODE) {
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

  _removeGlobalClickListener() {
    document.removeEventListener('click', this.globalClickListener)
  }

  _onInitialDefaultDay() {
    const { days, value } = this.state
    this._setDateFromSepcialDay({ originDays: days, setDay: value })
  }

  renderInput = () => {
    const { placeholder, disable } = this.props
    const { value } = this.state

    return (
      <React.Fragment>
        <div className={Styles.container}>
          <span className={Styles.inputWrapper}>
            <input
              type="text"
              disabled={disable}
              readOnly={disable}
              placeholder={placeholder}
              className={classNames(Styles.input, { [Styles.disable]: disable })}
              value={value}
              onChange={e => this.onInputChange(e)}
              onFocus={e => this.onModalOpen(e)}
            />
          </span>
          <i className={Styles.calendar} />
          <i
            className={Styles.close}
            onClick={this.onInputClear}
            role="presentation"
          />
          <div className={Styles.line} />
        </div>
        { disable && <div className={Styles.inputDisable} /> }
      </React.Fragment>
    )
  }

  renderModal = () => {
    const { showModal } = this.state
    return (
      <DateContext.Provider
        value={
          {
            ...this.props,
            ...this.state,
            onSelectDay: this.onSelectDay,
            onSelectToday: this.onSelectToday,
            onChangeModel: this.onChangeModel,
            onPrevMonth: this.onPrevMonth,
            onPrevYear: this.onPrevYear,
            onNextMonth: this.onNextMonth,
            onNextYear: this.onNextYear,
            onInputChange: this.onInputChange,
            onChangeMode: this.onChangeMode,
            onSelectYearOrMonth: this.onSelectYearOrMonth,
            onPrev: this.onPrev,
            onNext: this.onNext,
            onMonthModalOpen: this.onMonthModalOpen,
          }
        }
      >
        <Modal isMounted={showModal} delayTime={200} />
      </DateContext.Provider>
    )
  }

  render() {
    const { inline } = this.props
    return (
      <div
        className={`picker-wrapper ${Styles.wrapper}`}
        style={inline ? { display: 'inline-block' } : {}}
      >
        { this.renderInput() }
        { this.renderModal() }
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
  disable: false,
  disabledDate: noop,
}

DatePicker.propTypes = {
  inline: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultDate: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelectDate: PropTypes.func.isRequired,
  disable: PropTypes.bool,
  disabledDate: PropTypes.func,
}

export default DatePicker
