import React from 'react'

import { ComponentOutsidePress } from 'components/Elements'

import styles from 'styles/components/Widget/Modal/index.module.scss'

import { ModalProps } from './types'

const Modal = ({
  visible = false,
  children,
  classNameContent,
  onPressClose
}: ModalProps) => (
  <div className={styles.container} arial-visible={String(visible)}>
    {visible && (
      <ComponentOutsidePress
        className={classNameContent}
        actived={visible}
        onPressOutside={onPressClose}
      >
        {children}
      </ComponentOutsidePress>
    )}
  </div>
)

export default Modal
