import React from 'react'
import classNames from 'classnames'
import Styles from './index.css'
import {
  PREV_DAY, NEXT_DAY,
} from '../../const'
import { DateContext } from '../../context'

const Index = () => (
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

export default Index
