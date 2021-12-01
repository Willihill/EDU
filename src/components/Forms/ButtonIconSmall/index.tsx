import React, { FormEvent, memo } from 'react'
import {
  BsFunnelFill,
  BsPersonPlusFill
} from 'react-icons/bs'
import {
  FiSave
} from 'react-icons/fi'

import { LoadingIndicator } from 'components/Widget'

import styles from 'styles/components/Forms/ButtonIconSmall/index.module.scss'

import { ButtonIconSmallIcon, ButtonIconSmallProps, ButtonIconSmallTheme } from './types'

const ButtonIconSmall = memo(({
  label,
  disabled = false,
  loading = false,
  icon,
  theme = ButtonIconSmallTheme.BlueDark,
  onPress
}: ButtonIconSmallProps) => {
  const getIcon = () => {
    switch (icon) {
      case ButtonIconSmallIcon.FunnelFill:
        return <BsFunnelFill className={styles.icon} />
      case ButtonIconSmallIcon.PersonPlusFill:
        return <BsPersonPlusFill className={styles.icon} />
      case ButtonIconSmallIcon.SaveOutline:
        return <FiSave className={styles.icon} />
      case undefined:
        return null
    }
  }

  const onClickButton = (e: FormEvent<HTMLButtonElement>) => {
    if (loading || disabled) e.preventDefault()
    else onPress?.()
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        arial-theme={theme}
        onClick={onClickButton}
        disabled={disabled}
      >
        {loading
          ? <LoadingIndicator />
          : (
            <>
              {getIcon()}
              <span className={styles.label}>{label}</span>
            </>
            )}
      </button>
    </div>
  )
})

export default ButtonIconSmall
