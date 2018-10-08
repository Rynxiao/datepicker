/* eslint-disable no-underscore-dangle */
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Styles from './picker.css'
import {
  MONTH_DEFAULT_PLACEHOLDER, noop, MONTH_MODE, MONTH_DECADE_MODE,
} from '../../const'
import MonthModal from '../modal/MonthModal'
import { getCurrentYear, getCurrentMonth, formatMonthOrDay } from '../../utils'

class MonthPicker extends React.Component {
  constructor(props) {
    super(props)
    const { year, month } = this.props
    this.state = {
      showModal: false,
      year: year,
      month: month,
      mode: MONTH_MODE,
      value: `${year}-${formatMonthOrDay(month)}`,
    }
  }

  onModalOpen = () => {
    this.setState({ showModal: true })
  }

  onModalClose = () => {
    this.setState({ showModal: false })
  }

  onInputChange = noop

  _getTitleByMode = () => {
    const { year } = this.state
    return year
  }

  onChangeMode = () => {
    const { mode } = this.state
    if (mode === MONTH_MODE) {
      this.setState({ mode: MONTH_DECADE_MODE })
    }
  }

  onSelectYearOrMonth = val => {
    const { mode } = this.state
    if (mode === MONTH_DECADE_MODE) {
      this.setState({ mode: MONTH_MODE, year: val })
    } else {
      const { year } = this.state
      this.setState({ month: val, value: `${year}-${formatMonthOrDay(val)}` }, () => this.onModalClose())
    }
  }

  onPrev = () => {
    const { mode } = this.state
    if (mode === MONTH_DECADE_MODE) {
      console.log('MONTH_DECADE_MODE')
    } else {
      const { year } = this.state
      this.setState({ year: +year - 1 })
    }
  }

  onNext = () => {
    const { mode } = this.state
    if (mode === MONTH_DECADE_MODE) {
      console.log('MONTH_DECADE_MODE')
    } else {
      const { year } = this.state
      this.setState({ year: +year + 1 })
    }
  }

  renderInput = () => {
    const { inline, placeholder, disable } = this.props
    const { value } = this.state

    return (
      <React.Fragment>
        <div
          className={Styles.container}
          style={inline ? { display: 'inline-block' } : {}}
        >
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
    const {
      showModal, year, month, mode,
    } = this.state
    return (
      <MonthModal
        isMounted={showModal}
        delayTime={200}
        year={year}
        month={month}
        title={this._getTitleByMode(mode)}
        mode={mode}
        onChangeMode={this.onChangeMode}
        onSelectYearOrMonth={this.onSelectYearOrMonth}
        onPrev={this.onPrev}
        onNext={this.onNext}
      />
    )
  }

  render() {
    return (
      <div className={`picker-wrapper ${Styles.wrapper}`}>
        { this.renderInput() }
        { this.renderModal() }
      </div>
    )
  }
}

MonthPicker.defaultProps = {
  inline: false,
  placeholder: MONTH_DEFAULT_PLACEHOLDER,
  disable: false,
  year: getCurrentYear(),
  month: getCurrentMonth(),
}

MonthPicker.propTypes = {
  inline: PropTypes.bool,
  placeholder: PropTypes.string,
  year: PropTypes.string,
  month: PropTypes.string,
  disable: PropTypes.bool,
}

export default MonthPicker
