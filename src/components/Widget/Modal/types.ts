import React from 'react'

export interface ModalProps {
  visible: boolean
  children: React.ReactChild | React.ReactChild[]
  classNameContent?: string
  onPressClose: () => void
}
