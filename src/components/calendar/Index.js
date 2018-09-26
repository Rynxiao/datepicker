import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Styles from './index.css'
import {
  getDaysOfMonth,
  getWeekSort,
  selectDayByIndex,
} from '../../helper'
import {
  PREV_DAY, NEXT_DAY, _,
} from '../../const'

class Index extends React.Component {
  constructor(props) {
    super(props)

    const { value } = this.props
    this.state = {
      weekTags: [],
      days: [],
      /* eslint-disable react/no-unused-state */
      selectedDay: value,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.model !== state.prevModel) {
      return {
        prevModel: props.model,
        weekTags: getWeekSort(props.model),
        days: getDaysOfMonth(_, _, props.model),
      }
    }

    if (props.value !== state.selectedDay) {
      return { ...state, selectedDay: props.selectedDay }
    }

    return state
  }

  selectDay(day, index) {
    const { onSelectDay } = this.props
    const { days } = this.state
    const selectedDays = selectDayByIndex(days, index)
    // console.log(days)
    // console.log(index)
    // console.log(selectedDays)
    this.setState({ days: selectedDays }, () => {
      onSelectDay(day)
    })
  }

  render() {
    const { weekTags, days } = this.state

    return (
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
          days.map((day, index) => (
            <span
              className={classNames(Styles.normal, {
                [Styles.prev]: day.tag === PREV_DAY,
                [Styles.next]: day.tag === NEXT_DAY,
                [Styles.current]: day.current,
                [Styles.selected]: day.selected,
              })}
              title={day.full}
              key={day.full}
              onClick={() => this.selectDay(day, index)}
              role="presentation"
            >
              { day.day }
            </span>
          ))
        }
      </div>
    )
  }
}

Index.propTypes = {
  value: PropTypes.string.isRequired,
  onSelectDay: PropTypes.func.isRequired,
}

export default Index
