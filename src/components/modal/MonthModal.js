/* eslint-disable no-underscore-dangle */
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Styles from './modal.css'
import HeaderStyles from '../calendar/header.css'
import BodyStyles from './month.css'
import delayUnmounting from '../delayUnmounting'
import { MONTH_MODE, MONTH_DECADE_MODE, noop } from '../../const'
import { getDecadeByGivenYear, getChineseMonth } from '../../helper'

class MonthModal extends React.Component {
  _getRenderBody = () => {
    const { year, month, mode } = this.props
    if (mode === MONTH_MODE) {
      return getChineseMonth(month)
    }
    return getDecadeByGivenYear(year)
  }

  _getPrevAndNextTitles = () => {
    const { mode } = this.props
    if (mode === MONTH_MODE) {
      return {
        prev: '上一年',
        next: '下一年',
      }
    }
    return {
      prev: '上一年代',
      next: '下一年代',
    }
  }

  renderHeader = () => {
    const {
      title, onPrev, onNext, onChangeMode, mode,
    } = this.props
    const titles = this._getPrevAndNextTitles()
    return (
      <div className={`${HeaderStyles.wrapper} ${HeaderStyles.wrapper3}`}>
        <i
          className={HeaderStyles.prevYear}
          role="presentation"
          title={titles.prev}
          onClick={e => onPrev(e)}
        />
        <div className={HeaderStyles.text}>
          <span
            role="presentation"
            className={classNames({ [HeaderStyles.link]: mode === MONTH_MODE })}
            onClick={mode === MONTH_DECADE_MODE ? noop : e => onChangeMode(e)}
          >
            {title}
          </span>
        </div>
        <i
          className={HeaderStyles.nextYear}
          role="presentation"
          title={titles.next}
          onClick={e => onNext(e)}
        />
      </div>
    )
  }

  renderBody = () => {
    const { onSelectYearOrMonth } = this.props
    const bodyArr = this._getRenderBody()
    return (
      <div className={BodyStyles.wrapper}>
        { bodyArr.map(body => (
          <div
            key={body.value}
            className={BodyStyles.cell}
          >
            <span
              className={classNames(BodyStyles.td, {
                [BodyStyles.current]: body.flag === 'current',
                [BodyStyles.last]: body.flag === 'prev',
                [BodyStyles.next]: body.flag === 'next',
              })}
              role="presentation"
              onClick={e => onSelectYearOrMonth(body.code, e)}
            >
              {body.value}
            </span>
          </div>
        )) }
      </div>
    )
  }

  render() {
    const { isMounted } = this.props

    return (
      <React.Fragment>
        <div className={classNames(
          `${Styles.container} ${Styles.monthContainer}`,
          {
            [Styles.in]: isMounted,
            [Styles.out]: !isMounted,
          },
        )}
        >
          <div className={`${Styles.panel} ${Styles.monthPanel}`}>
            { this.renderHeader() }
            { this.renderBody() }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

MonthModal.defaultProps = {
  isMounted: false,
}

MonthModal.propTypes = {
  isMounted: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  mode: PropTypes.string.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onChangeMode: PropTypes.func.isRequired,
  onSelectYearOrMonth: PropTypes.func.isRequired,
}

export default delayUnmounting(MonthModal)
