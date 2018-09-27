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
  value,
  onInputChange,
  onCloseModal,
}) => (
  <React.Fragment>
    <div className={classNames(Styles.container, {
      [Styles.in]: isMounted,
      [Styles.out]: !isMounted,
    })}
    >
      <Input
        value={value}
        onInputChange={onInputChange}
      />
      <div className="calendar">
        <Header />
        <Body
          value={value}
          onCloseModal={onCloseModal}
        />
      </div>
      <Footer />
    </div>
  </React.Fragment>
)

Modal.defaultProps = {
  isMounted: false,
}

Modal.propTypes = {
  isMounted: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}

export default delayUnmounting(Modal)
