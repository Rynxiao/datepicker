import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Styles from './index.css'
import {
  getDaysOfMonth,
  getWeekSort,
  // selectDayByIndex,
  setSelectedDays,
} from '../../helper'
import {
  PREV_DAY, NEXT_DAY, _,
} from '../../const'
import { DateContext } from '../../context'

class Index extends React.Component {
  constructor(props) {
    super(props)

    const { value } = this.props
    this.state = {
      // weekTags: [],
      // days: [],
      /* eslint-disable react/no-unused-state */
      selectedDay: value,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.model !== state.prevModel) {
      const changeModelDays = getDaysOfMonth(_, _, props.model)
      const afterSetDays = setSelectedDays(changeModelDays, state.selectedDay)
      return {
        prevModel: props.model,
        weekTags: getWeekSort(props.model),
        days: afterSetDays,
      }
    }

    if (props.value !== state.selectedDay) {
      return { ...state, selectedDay: props.value }
    }

    return state
  }

  // selectDay(day, index) {
  // const { onSelectDay, onCloseModal } = this.props
  // const { days } = this.state
  // const selectedDays = selectDayByIndex(days, index)
  // this.setState({ days: selectedDays }, () => {
  //   onSelectDay(day)
  //   onCloseModal()
  // })
  // }

  render() {
    return (
      <DateContext.Consumer>
        {
          ({ weekTags, days, onSelectDay }) => (
            <div className={Styles.wrapper}>
              { weekTags.map(weekName => (
                <span
                  className={`${Styles.normal} ${Styles.week}`}
                  title={`星期${weekName}`}
                  key={weekName}
                >
                  { weekName }
                </span>
              )) }
              {
                days.map(day => (
                  <span
                    className={classNames(Styles.normal, {
                      [Styles.prev]: day.tag === PREV_DAY,
                      [Styles.next]: day.tag === NEXT_DAY,
                      [Styles.current]: day.current,
                      [Styles.selected]: day.selected,
                    })}
                    title={day.full}
                    key={day.full}
                    onClick={() => onSelectDay(day)}
                    role="presentation"
                  >
                    { day.day }
                  </span>
                ))
              }
            </div>
          )
        }
      </DateContext.Consumer>
    )
  }
}

Index.propTypes = {
  value: PropTypes.string.isRequired,
  // onSelectDay: PropTypes.func.isRequired,
  // onCloseModal: PropTypes.func.isRequired,
}

export default Index
