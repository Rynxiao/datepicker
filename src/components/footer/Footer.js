import React from 'react'
import PropTypes from 'prop-types'
import Styles from './footer.css'
import { CHINESE_MODEL } from '../../const'

const Footer = ({ model, onChangeModel }) => (
  <div className={Styles.wrapper}>
    <div />
    <div className={Styles.today}><span>今天</span></div>
    <div role="presentation" className={Styles.lang} onClick={() => onChangeModel(model)}>
      <span>{ model === CHINESE_MODEL ? '中' : '西' }</span>
    </div>
  </div>
)

Footer.propTypes = {
  model: PropTypes.string.isRequired,
  onChangeModel: PropTypes.func.isRequired,
}

export default Footer
