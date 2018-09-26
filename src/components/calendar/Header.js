import React from 'react'
import Styles from './header.css'

const Header = () => (
  <div className={Styles.wrapper}>
    <i className={Styles.prevYear} role="button" title="上一年" />
    <i className={Styles.prevMonth} role="button" title="上一月" />
    <div className={Styles.text}>
      <span className={Styles.link}>2018年</span>
      <span className={Styles.link}>9月</span>
    </div>
    <i className={Styles.nextMonth} role="button" title="下一月" />
    <i className={Styles.nextYear} role="button" title="下一年" />
  </div>
)

export default Header
