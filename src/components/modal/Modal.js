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
  // showModal,
  onInputChange,
  onChangeModel,
  onSelectDay,
  model,
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
          model={model}
          value={value}
          onSelectDay={onSelectDay}
        />
      </div>
      <Footer model={model} onChangeModel={onChangeModel} />
    </div>
  </React.Fragment>
)

Modal.defaultProps = {
  isMounted: false,
}

Modal.propTypes = {
  isMounted: PropTypes.bool,
  value: PropTypes.string.isRequired,
  // showModal: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  model: PropTypes.string.isRequired,
  onChangeModel: PropTypes.func.isRequired,
  onSelectDay: PropTypes.func.isRequired,
}

export default delayUnmounting(Modal)
