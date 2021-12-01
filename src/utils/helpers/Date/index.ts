import moment, { MomentInput } from 'moment'
import { MonthList, WeekDayList } from 'utils/common/constants'

type DateAcceptType = Date | string | MomentInput | undefined | null

export const dateToDb = (date: DateAcceptType = '') =>
  date ? moment(date).format('YYYY-MM-DD') : ''

export const monthYearToDb = (date: DateAcceptType = '') =>
  date ? moment(date).format('MM-YYYY') : ''

export const dateToInput = (date: DateAcceptType = '') =>
  date ? moment(date).format('DD/MM/YYYY') : ''

export const monthToInput = (date: DateAcceptType = '') =>
  date ? moment(date).format('DD/MM') : ''

export const monthYearToInput = (date: DateAcceptType = '') =>
  date ? moment(date).format('MM/YYYY') : ''

export const monthNameToInput = (date: Date | string) => moment(date).format('DD/MMM')

export const dateHourToInput = (date: Date|string = '') => {
  return date && moment(date).format('DD/MM/YYYY hh:mm:ss')
}

export const dateHourToDb = (date: Date|string = '') =>
  date && moment(date).format('YYYY-MM-DDThh:mm:ss')

export const dateSubtractCurrent = (period: number = 0) => {
  return moment().subtract(period, 'days').startOf('day').format()
}

export const dateFormatTitle = (initial: string = '', final: string = ''): string => {
  return `${dateToInput(initial)}` + (final !== '' ? `${(` - ${dateToInput(final)}`)}` : '')
}

export const dateMonthName = (date: Date | string) => moment(date).format('MMMM')

export const dateWeekDayName = (date: Date | string) => moment(date).format('dddd')

export const dateClone = (date: DateAcceptType = '') => moment(date).toDate()

export const populateMonthsLocale = () => moment.updateLocale('pt-br', { months: MonthList })

export const populateWeekDaysLocale = () => moment.updateLocale('pt-br', { weekdays: WeekDayList })

export const updatePortugueseMomentLocale = () => {
  populateMonthsLocale()
  populateWeekDaysLocale()
  moment.locale('pt-br')
}

export const dateIsWeekend = (date: Date | string) => {
  const weekday = moment(date).weekday()
  return weekday === 6 || weekday === 0
}

export const dateToNextWeekday = (date: Date) => {
  while (dateIsWeekend(date)) {
    date.setDate(date.getDate() + 1)
  }
}

export const getYearDate = (date: Date | string) => moment(date).year()

export const dateMonthYear = (date: Date | string) => `${dateMonthName(date).toUpperCase()} ${getYearDate(date)}`

export const getStartMonth = (date: Date | string) => moment(date).startOf('month')

export const getEndMonth = (date: Date | string) => moment(date).endOf('month')

export const getCountDayInMonth = (date: Date | string | MomentInput) => moment(date).daysInMonth()

export const getMonthDate = (date: Date | string) => moment(date).month()

export const getDayDate = (date: Date | string) => moment(date).date()

export const dayToDate = (date: Date | string, day: number) => dateClone(moment(date).format(`YYYY-MM-${day}`))

export const dateAddDays = (date: DateAcceptType, days: number = 1) => moment(date).add({
  days
})

export const dateAddWeeks = (date: DateAcceptType, weeks: number = 1) => moment(date).add({
  weeks
})

export const getStartWeek = (date: DateAcceptType) => moment(date).startOf('week')
