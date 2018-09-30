import React from 'react'
import PropTypes from 'prop-types'
import Styles from './footer.css'
import { DateContext } from '../../context'
import { CHINESE_MODEL } from '../../const'
import { getDateFormatFromSepecificDate, withContext } from '../../utils'

const Footer = ({
  context: {
    model, onChangeModel, onSelectToday,
  },
}) => (
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

Footer.propTypes = {
  context: PropTypes.shape({
    model: PropTypes.string.isRequired,
    onChangeModel: PropTypes.func.isRequired,
    onSelectToday: PropTypes.func.isRequired,
  }).isRequired,
}

export default withContext(DateContext, Footer)
