import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Styles from './modal.css'
import delayUnmounting from '../delayUnmounting'
import Input from '../input/Input'
import Header from '../calendar/Header'
import Body from '../calendar/Index'
import Footer from '../footer/Footer'

const Modal = ({
  isMounted,
}) => (
  <React.Fragment>
    <div className={classNames(Styles.container, {
      [Styles.in]: isMounted,
      [Styles.out]: !isMounted,
    })}
    >
      <Input />
      <div className={Styles.panel}>
        <div className={Styles.header}>
          <Header />
        </div>
        <Body />
        <Footer />
      </div>
    </div>
  </React.Fragment>
)

Modal.defaultProps = {
  isMounted: false,
}

Modal.propTypes = {
  isMounted: PropTypes.bool,
}

export default delayUnmounting(Modal)
