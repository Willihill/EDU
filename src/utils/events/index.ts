import { SyntheticEvent } from 'react'

export const hasScrolledToEnd = (event: SyntheticEvent<HTMLDivElement>, distanceBottom: number = 100): Boolean => {
  const scrollDistanceBottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop
  return (scrollDistanceBottom - event.currentTarget.clientHeight) <= distanceBottom
}

export const hasScrollBar = (element: HTMLDivElement) =>
  element.scrollHeight !== element.clientHeight
