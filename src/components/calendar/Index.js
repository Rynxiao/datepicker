import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Styles from './index.css'
import {
  PREV_DAY, NEXT_DAY,
} from '../../const'
import { DateContext } from '../../context'
import { withContext } from '../../utils'

class Index extends React.Component {
  selectDay = (day, event) => {
    if (day.disabled) {
      return
    }
    const { context: { onSelectDay } } = this.props
    onSelectDay(day, event)
  }

  render() {
    const { context: { weekTags, days } } = this.props

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
          days.map(day => (
            <span
              className={classNames(Styles.normal, {
                [Styles.prev]: day.tag === PREV_DAY,
                [Styles.next]: day.tag === NEXT_DAY,
                [Styles.current]: day.current,
                [Styles.selected]: day.selected,
                [Styles.disabled]: day.disabled,
              })}
              title={day.full}
              key={day.full}
              onClick={e => this.selectDay(day, e)}
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
  context: PropTypes.shape({
    weekTags: PropTypes.array.isRequired,
    days: PropTypes.array.isRequired,
    onSelectDay: PropTypes.func.isRequired,
  }).isRequired,
}

export default withContext(DateContext, Index)
