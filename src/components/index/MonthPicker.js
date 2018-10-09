/* eslint-disable no-underscore-dangle */
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Styles from './picker.css'
import {
  MONTH_DEFAULT_PLACEHOLDER, noop, MONTH_MODE, MONTH_DECADE_MODE,
} from '../../const'
import MonthModal from '../modal/MonthModal'
import {
  getCurrentYear, getCurrentMonth, formatMonthOrDay,
} from '../../utils'

class MonthPicker extends React.Component {
  constructor(props) {
    super(props)
    const { year, month } = this.props
    this.state = {
      showModal: false,
      year: year,
      month: month,
      decade: year,
      mode: MONTH_MODE,
      value: `${year}-${formatMonthOrDay(month)}`,
    }
  }

  componentDidMount() {
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
      this.setState({ mode: MONTH_MODE, year: val, decade: val })
    } else {
      const { year } = this.state
      const { onSelectMonth } = this.props
      this.setState({ month: val, value: `${year}-${formatMonthOrDay(val)}` }, () => {
        onSelectMonth(`${year}-${formatMonthOrDay(val)}`)
        this.onModalClose()
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
      if (event.target.closest('#monthPickerWrapper')) {
        return
      }

      // hack
      const cNames = event.target.className
      const { mode } = this.state
      if (cNames.includes('month__td') && mode === MONTH_MODE) {
        return
      }

      this.onModalClose()
    })
  }

  _removeGlobalClickListener() {
    document.removeEventListener('click', this.globalClickListener)
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
    const {
      showModal, year, month, mode, decade,
    } = this.state
    return (
      <MonthModal
        isMounted={showModal}
        delayTime={200}
        year={year}
        month={month}
        decade={decade}
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
    const { inline } = this.props
    return (
      <div
        id="monthPickerWrapper"
        className={`${Styles.wrapper}`}
        style={inline ? { display: 'inline-block' } : {}}
      >
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
  onSelectMonth: PropTypes.func.isRequired,
}

export default MonthPicker
