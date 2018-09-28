import React from 'react'
import Styles from './footer.css'
import { DateContext } from '../../context'
import { CHINESE_MODEL } from '../../const'
import { getDateFormatFromSepecificDate } from '../../utils'

const Footer = () => (
  <DateContext.Consumer>
    {
      ({ model, onChangeModel, onSelectToday }) => (
        <div className={Styles.wrapper}>
          <div />
          <div
            role="presentation"
            className={Styles.today}
            onClick={e => onSelectToday(getDateFormatFromSepecificDate(), e)}
          >
            <span>今天</span>
          </div>
          <div role="presentation" className={Styles.lang} onClick={e => onChangeModel(model, e)}>
            <span>{ model === CHINESE_MODEL ? '中' : '西' }</span>
          </div>
        </div>
      )
    }
  </DateContext.Consumer>
)

export default Footer
