import React, { memo, useState, useEffect } from 'react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'

import useYearBlock from 'hooks/useYearBlock'

import styles from 'styles/components/Elements/FlexCalendar/index.module.scss'

import { MonthList, WeekDayList } from 'utils/common/constants'
import { createRowsArray } from 'utils/helpers/Array'
import { getDayDate, getMonthDate, getYearDate } from 'utils/helpers/Date'
import { padDay } from 'utils/helpers/String'

import { FlexCalendarDateChange, FlexCalendarDayProps, FlexCalendarMonthProps, FlexCalendarNavigationLevel, FlexCalendarAlign, FlexCalendarProps, FlexCalendarTheme, FlexCalendarYearProps } from './types'

const FlexCalendarYear = memo(({
  years,
  selectedYear,
  onPressYear
}: FlexCalendarYearProps) => (
  <div className={styles.column}>
    {createRowsArray(years, 4, 0).map((yearList, idx) => (
      <div key={idx} className={styles.line}>
        {yearList.map((year, yIdx) => (
          <div
            key={`${idx}_${yIdx}`}
            className={styles.year}
            onClick={() => onPressYear(year)}
            arial-empty={String(year === 0)}
            arial-selected={String(selectedYear === year)}
          >
            <span>{year}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
))

const MONTH_COLUMNS = 4

const FlexCalendarMonth = memo(({
  isCurrentYear,
  selectedMonth,
  onPressMonth
}: FlexCalendarMonthProps) => {
  const [months] = useState<string[][]>(createRowsArray(MonthList.map(i => i.slice(0, 3).toUpperCase()), MONTH_COLUMNS))
  const getMonthIndex = (monthIndex: number, lineIndex: number) => monthIndex + (lineIndex * MONTH_COLUMNS)

  return (
    <div className={styles.column}>
      {months.map((months, idx) => (
        <div
          key={idx}
          className={styles.line}
        >
          {months.map((month, mIdx) => (
            <div
              key={month}
              className={styles.month}
              onClick={() => onPressMonth(getMonthIndex(mIdx, idx))}
              arial-selected={String(selectedMonth === getMonthIndex(mIdx, idx) && isCurrentYear)}
            >
              <span>{month}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
})

const FlexCalendarDay = memo(({
  days,
  isCurrentYear,
  isCurrentMonth,
  selectedDay,
  onPressDay
}: FlexCalendarDayProps) => {
  return (
    <div className={styles.calendar}>
      {WeekDayList.map((item, idx) => (
        <div
          key={item}
          className={styles.column}
        >
          <div className={styles.weekDay}>
            <span>{item.slice(0, 3)}</span>
            {days.map((dayBlock, dIdx) => (
              <div
                key={`${idx}-${dIdx}`}
                className={styles.day}
                onClick={() => onPressDay(dayBlock[idx])}
                arial-empty={String(dayBlock[idx] === 0)}
                arial-selected={String(dayBlock[idx] === selectedDay && isCurrentYear && isCurrentMonth)}
              >
                <span>
                  {dayBlock[idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
})

const FlexCalendar = ({
  visible = false,
  date = '',
  navigationLeve = FlexCalendarNavigationLevel.Day,
  theme = FlexCalendarTheme.Purple,
  align = FlexCalendarAlign.Left,
  onChangeDate
}: FlexCalendarProps) => {
  const [selectedYear, setSelectedYear] = useState(getYearDate(new Date()))
  const [selectedMonth, setSelectedMonth] = useState(getMonthDate(new Date()))
  const [navigationLevel, setNavigationLevel] = useState<FlexCalendarNavigationLevel>(navigationLeve)

  const {
    dayBlocks,
    currentBlock,
    prevBlock,
    nextBlock
  } = useYearBlock(selectedMonth, selectedYear)

  useEffect(() => {
    if (!visible && date) {
      setSelectedYear(getYearDate(date))
      setSelectedMonth(getMonthDate(date))
      setNavigationLevel(navigationLeve)
    }
  }, [visible])

  const changeDate = ({ year = selectedYear, month = selectedMonth, day = 1 }: FlexCalendarDateChange) => {
    onChangeDate(`${year}-${padDay(month + 1)}-${padDay(day)}`)
  }

  const getNavLevelInfo = () => {
    switch (navigationLevel) {
      case FlexCalendarNavigationLevel.Day:
        return `${MonthList[selectedMonth]} DE ${selectedYear}`
      case FlexCalendarNavigationLevel.Month:
        return selectedYear
      case FlexCalendarNavigationLevel.Year:
        return ''
    }
  }

  const onPressNavigationLevel = () => {
    setNavigationLevel(navigationLevel === FlexCalendarNavigationLevel.Day
      ? FlexCalendarNavigationLevel.Month
      : FlexCalendarNavigationLevel.Year
    )
  }

  const onPressBack = () => {
    switch (navigationLevel) {
      case FlexCalendarNavigationLevel.Year:
        prevBlock()
        break
      case FlexCalendarNavigationLevel.Month:
        setSelectedYear(selectedYear - 1)
        break
      case FlexCalendarNavigationLevel.Day:
        if (selectedMonth > 0) return setSelectedMonth(selectedMonth - 1)
        setSelectedYear(selectedYear - 1)
        setSelectedMonth(11)
        break
    }
  }

  const onPressNext = () => {
    switch (navigationLevel) {
      case FlexCalendarNavigationLevel.Year:
        nextBlock()
        break
      case FlexCalendarNavigationLevel.Month:
        setSelectedYear(selectedYear + 1)
        break
      case FlexCalendarNavigationLevel.Day:
        if (selectedMonth < 11) return setSelectedMonth(selectedMonth + 1)
        setSelectedYear(selectedYear + 1)
        setSelectedMonth(0)
        break
    }
  }

  const onPressYear = (year: number) => {
    setSelectedYear(year)

    if (navigationLeve === FlexCalendarNavigationLevel.Year) changeDate({ year })
    else setNavigationLevel(FlexCalendarNavigationLevel.Month)
  }

  const onPressMonth = (month: number) => {
    setSelectedMonth(month)

    if (navigationLeve === FlexCalendarNavigationLevel.Month) changeDate({ month })
    else setNavigationLevel(FlexCalendarNavigationLevel.Day)
  }

  const onPressDay = (day: number) => {
    changeDate({
      year: selectedYear,
      month: selectedMonth,
      day
    })
  }

  return (
    <div
      className={styles.container}
      arial-visible={String(visible)}
      arial-theme={theme}
      arial-align={align}
    >
      <div className={styles.header}>
        <span
          className={styles.navLevelInfo}
          onClick={onPressNavigationLevel}
        >
          {getNavLevelInfo()}
        </span>

        <div className={styles.arrows}>
          <HiArrowLeft
            className={styles.navArrow}
            title='Voltar'
            onClick={onPressBack}
          />
          <HiArrowRight
            className={styles.navArrow}
            title='Avançar'
            onClick={onPressNext}
          />
        </div>
      </div>

      <div className={styles.content}>
        {navigationLevel === FlexCalendarNavigationLevel.Year && (
          <FlexCalendarYear
            years={currentBlock}
            selectedYear={getYearDate(date)}
            onPressYear={onPressYear}
          />
        )}

        {navigationLevel === FlexCalendarNavigationLevel.Month && (
          <FlexCalendarMonth
            isCurrentYear={selectedYear === getYearDate(date)}
            selectedMonth={getMonthDate(date)}
            onPressMonth={onPressMonth}
          />
        )}

        {navigationLevel === FlexCalendarNavigationLevel.Day && (
          <FlexCalendarDay
            days={dayBlocks}
            isCurrentYear={selectedYear === getYearDate(date)}
            isCurrentMonth={selectedMonth === getMonthDate(date)}
            selectedDay={getDayDate(date)}
            onPressDay={onPressDay}
          />
        )}
      </div>
    </div>
  )
}

export default memo(FlexCalendar)
