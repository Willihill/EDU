import React, { useEffect, useState } from 'react'
import { FaSort, FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa'

import styles from 'styles/components/Elements/FlexGrid/index.module.scss'

import { Paths } from 'utils/common/types'
import { getValueByPathKey, isKeyof } from 'utils/helpers/Object'

import { FlexGridColumnOrderProps, FlexGridColumnOrderType, FlexGridColumnProps, FlexGridDataProps, FlexGridProps, FlexGridTheme } from './types'

const FlexGrid = <T extends FlexGridDataProps>({
  data,
  columns,
  hideBorder = false,
  theme = FlexGridTheme.White,
  columnDefaultSort = 0,
  onPressRow
}: FlexGridProps<T>) => {
  const [dataOrderned, setDataOrderned] = useState<T[]>([])
  const [columnOrder, setColumnOrder] = useState<FlexGridColumnOrderProps | null>(null)

  useEffect(() => {
    setColumnOrder({
      column: columns[columnDefaultSort],
      order: FlexGridColumnOrderType.Asc
    })
  }, [])

  useEffect(() => {
    if (!dataOrderned.length) forceOrderByColumn(columns[columnDefaultSort])()

    if (columnOrder) orderDataByType(columnOrder.column, columnOrder.order)
    else orderDataByType(columns[columnDefaultSort], FlexGridColumnOrderType.Asc)
  }, [data])

  const onClickHeader = (column: FlexGridColumnProps<T>) => () => {
    if (!column.orderable) return
    const orderType = toggleColumnOrder(column)
    orderDataByType(column, orderType)
  }

  const forceOrderByColumn = (column: FlexGridColumnProps<T>) => () => {
    const orderType = toggleColumnOrder(column)
    orderDataByType(column, orderType)
  }

  const orderDataByType = (column: FlexGridColumnProps<T>, orderType: FlexGridColumnOrderType) => {
    if (orderType === FlexGridColumnOrderType.Asc) orderByAsc(column)
    else orderByDesc(column)
  }

  const orderByAsc = (column: FlexGridColumnProps<T>) =>
    setDataOrderned(
      Object.assign([], data)
        .sort((prev, next) => getColumnValueByKey(prev, column.key) > getColumnValueByKey(next, column.key) ? 1 : -1)
    )

  const orderByDesc = (column: FlexGridColumnProps<T>) =>
    setDataOrderned(
      Object.assign([], data)
        .sort((prev, next) => getColumnValueByKey(prev, column.key) < getColumnValueByKey(next, column.key) ? 1 : -1)
    )

  const toggleColumnOrder = (column: FlexGridColumnProps<T>) => {
    const orderType = getColumnOrderType(column)
    const newOrderType = orderType === FlexGridColumnOrderType.Asc
      ? FlexGridColumnOrderType.Desc
      : FlexGridColumnOrderType.Asc

    setColumnOrderType(column, newOrderType)
    return newOrderType
  }

  const getColumnOrderType = (column: FlexGridColumnProps<T>) =>
    columnOrder?.column === column && columnOrder.order

  const setColumnOrderType = (column: FlexGridColumnProps<T>, orderType: FlexGridColumnOrderType) =>
    setColumnOrder({ column: column, order: orderType })

  const getColumnOrderIcon = (column: FlexGridColumnProps<T>) => {
    const orderType = getColumnOrderType(column)

    switch (orderType) {
      case FlexGridColumnOrderType.Asc:
        return <FaSortAlphaDown className={styles.iconOrder} />
      case FlexGridColumnOrderType.Desc:
        return <FaSortAlphaDownAlt className={styles.iconOrder} />
      default:
        return <FaSort className={styles.iconOrder} />
    }
  }

  const getColumnValueByKey = (item: T, key: keyof T | Paths<T, 5>) => {
    if (isKeyof(item, key)) return item[key as keyof T]

    const pathKeys: Paths<T, 5> = key as Paths<T, 5>
    return getValueByPathKey(item, pathKeys)
  }

  return (
    <div className={styles.container}>
      <table
        className={styles.table}
        arial-theme={theme.valueOf()}
      >
        <colgroup>
          {columns.map(column => (
            <col key={column.label} style={{ width: column.width }} />
          ))}
        </colgroup>
        <thead className={styles.headers}>
          <tr>
            {columns.map(column => (
              <th
                key={column.label}
                className={styles.header}
                onClick={onClickHeader(column)}
                arial-hideborder={String(hideBorder)}
                arail-header-fixed={String(column.fixed)}
                arail-header-orderable={String(column.orderable)}
              >
                <span>{column.label}</span> {column.orderable && getColumnOrderIcon(column)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.body}>
          {dataOrderned.map((item, idx) => (
            <tr
              key={idx}
              className={styles.row}
              arial-hideborder={String(hideBorder)}
              arial-active={String(item?.isActive)}
              onClick={() => onPressRow?.(item)}
            >
              {columns.map(column => (
                <td
                  key={column.label}
                  className={styles.info}
                  arail-header-fixed={String(column.fixed)}
                >
                  {column.component !== undefined
                    ? column.component?.(item, idx)
                    : <span>{column.transform ? column.transform(getColumnValueByKey(item, column.key)) : getColumnValueByKey(item, column.key)}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FlexGrid
