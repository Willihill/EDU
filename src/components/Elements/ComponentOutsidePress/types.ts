import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ComponentOutsidePressProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  actived: boolean
  onPressOutside: () => void
}
