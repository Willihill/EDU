import { SyntheticEvent } from 'react'

export enum ScrollControllDirection {
  Horizontal,
  Vertical
}

export interface ScrollControllProps {
  direction?: ScrollControllDirection
  gap?: number
  children: React.ReactChild | React.ReactChild[]
  onScroll?: (event: SyntheticEvent<HTMLDivElement>) => void
}
