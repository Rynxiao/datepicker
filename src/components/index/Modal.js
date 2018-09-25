import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Styles from './modal.css'
import delayUnmounting from '../delayUnmounting'

const Modal = ({ isMounted }) => (
  <React.Fragment>
    <div className={classNames(Styles.container, {
      [Styles.in]: isMounted,
      [Styles.out]: !isMounted,
    })}
    >
      modal
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
