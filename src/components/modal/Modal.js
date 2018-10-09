import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Styles from './modal.css'
import delayUnmounting from '../delayUnmounting'
import Input from '../input/Input'
import Header from '../calendar/Header'
import Body from '../calendar/Index'
import Footer from '../footer/Footer'
import MonthModal from './MonthModal'
import { DateContext } from '../../context'
import { withContext } from '../../utils'

const Modal = ({
  isMounted,
  context: {
    year,
    month,
    decade,
    mode,
    showMonthModal,
    onChangeMode,
    onSelectYearOrMonth,
    onPrev,
    onNext,
  },
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
          <MonthModal
            isMounted={showMonthModal}
            animation={false}
            delayTime={200}
            year={year}
            month={month}
            decade={decade}
            title={year}
            mode={mode}
            onChangeMode={onChangeMode}
            onSelectYearOrMonth={onSelectYearOrMonth}
            onPrev={onPrev}
            onNext={onNext}
          />
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
  context: PropTypes.shape({
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    decade: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    mode: PropTypes.string.isRequired,
    showMonthModal: PropTypes.bool.isRequired,
    onChangeMode: PropTypes.func.isRequired,
    onSelectYearOrMonth: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
  }).isRequired,
}

export default withContext(DateContext, delayUnmounting(Modal))
