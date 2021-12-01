import { useEffect, useState } from 'react'

import moment from 'moment'
import { createRowsArray } from 'utils/helpers/Array'
import { getCountDayInMonth } from 'utils/helpers/Date'

type YearBlock = number[]
type DaysBlock = number[]

const MIN_YEAR = 1921
const MAX_YEAR = 2121
const DEFAULT_BLOCK_YEAR_COUNT = 16

const useYearBlock = (month: number, year: number, blockCount: number = DEFAULT_BLOCK_YEAR_COUNT) => {
  const [dayBlocks, setDayBlocks] = useState<DaysBlock[]>([])
  const [yearBlocks, setYearBlocks] = useState<YearBlock[]>([])
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0)

  useEffect(() => {
    const allBlocks = createYearAllBlocks()
    const curBlock = allBlocks.findIndex(i => i.includes(year))

    setYearBlocks(allBlocks)
    setCurrentBlockIndex(curBlock)
  }, [year, blockCount])

  useEffect(() => {
    setDayBlocks(createWeekMatrix())
  }, [month, year])

  const createYearAllBlocks = (): YearBlock[] => {
    const allYears: number[] = Array
      .from(Array(MAX_YEAR - MIN_YEAR + 1).keys())
      .map(i => MIN_YEAR + i)

    return createRowsArray(allYears, blockCount, 0)
  }

  const createWeekMatrix = (): DaysBlock[] => {
    const daysCount = getCountDayInMonth({ month, year })
    const weeksMatix: DaysBlock[] = createRowsArray(
      Array
        .from(Array(42).keys())
        .map(() => 0)
      , 7
    )

    let weekMonth = 0
    for (let i = 0; i < daysCount; i++) {
      const day = i + 1
      const momentDay = moment({ day, month, year })
      const weekDay = momentDay.weekday()

      weeksMatix[weekMonth][weekDay] = day
      if (weekDay === 6) weekMonth++
    }

    return weeksMatix
  }

  const prevBlock = () => {
    if (currentBlockIndex === 0) return // START OF ARRAY
    setCurrentBlockIndex(currentBlockIndex - 1)
  }

  const nextBlock = () => {
    const nextBlockIndex = currentBlockIndex + 1

    if (yearBlocks.length <= nextBlockIndex) return // END OF ARRAY
    setCurrentBlockIndex(nextBlockIndex)
  }

  return {
    dayBlocks,
    yearBlocks,
    currentBlock: yearBlocks[currentBlockIndex] ?? [],
    prevBlock,
    nextBlock
  }
}

export default useYearBlock
