import React from 'react'
import PropTypes from 'prop-types'
import Styles from './header.css'
import { DateContext } from '../../context'
import { withContext, formatMonthOrDay } from '../../utils'

const Header = ({
  context: {
    year,
    month,
    onPrevMonth,
    onPrevYear,
    onNextMonth,
    onNextYear,
  },
}) => (
  <div className={Styles.wrapper}>
    <i className={Styles.prevYear} role="presentation" title="上一年" onClick={e => onPrevYear(e)} />
    <i className={Styles.prevMonth} role="presentation" title="上一月" onClick={e => onPrevMonth(e)} />
    <div className={Styles.text}>
      <span className={Styles.link}>{`${year}年`}</span>
      <span className={Styles.link}>{`${formatMonthOrDay(month)}月`}</span>
    </div>
    <i className={Styles.nextMonth} role="presentation" title="下一月" onClick={e => onNextMonth(e)} />
    <i className={Styles.nextYear} role="presentation" title="下一年" onClick={e => onNextYear(e)} />
  </div>
)

Header.propTypes = {
  context: PropTypes.shape({
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onPrevMonth: PropTypes.func.isRequired,
    onPrevYear: PropTypes.func.isRequired,
    onNextMonth: PropTypes.func.isRequired,
    onNextYear: PropTypes.func.isRequired,
  }).isRequired,
}

export default withContext(DateContext, Header)
