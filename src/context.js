import React from 'react'
import { CHINESE_MODEL, _, noop } from './const'
import { getDaysOfMonth, getWeekSort } from './helper'

const model = CHINESE_MODEL
const days = getDaysOfMonth(_, _, model)
const weekTags = getWeekSort(model)

export const initialData = {
  model: model,
  days: days,
  weekTags: weekTags,
  onChangeModel: noop,
  onSelectDay: noop,
  onSelectToday: noop,
  onPrevMonth: noop,
  onPrevYear: noop,
  onNextMonth: noop,
  onNextYear: noop,
}

export const DateContext = React.createContext(initialData)
