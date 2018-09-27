import React from 'react'
import Styles from './header.css'
import { DateContext } from '../../context'

const Header = () => (
  <DateContext.Consumer>
    {
      ({
        year,
        month,
        onPrevMonth,
        onPrevYear,
        onNextMonth,
        onNextYear,
      }) => (
        <div className={Styles.wrapper}>
          <i className={Styles.prevYear} role="presentation" title="上一年" onClick={() => onPrevYear()} />
          <i className={Styles.prevMonth} role="presentation" title="上一月" onClick={() => onPrevMonth()} />
          <div className={Styles.text}>
            <span className={Styles.link}>{`${year}年`}</span>
            <span className={Styles.link}>{`${month}月`}</span>
          </div>
          <i className={Styles.nextMonth} role="presentation" title="下一月" onClick={() => onNextMonth()} />
          <i className={Styles.nextYear} role="presentation" title="下一年" onClick={() => onNextYear()} />
        </div>
      )
    }

  </DateContext.Consumer>
)

export default Header
