import React, { FormEvent, memo } from 'react'
import {
  BsFunnelFill,
  BsPersonPlusFill
} from 'react-icons/bs'
import {
  FiSave,
  FiPlus
} from 'react-icons/fi'

import { LoadingIndicator } from 'components/Widget'

import styles from 'styles/components/Forms/ButtonSecondary/index.module.scss'

import { ButtonSecondaryProps, ButtonSecondaryTheme, ButtonSecondaryIcon } from './types'

const ButtonSecondary = memo(({
  icon,
  label,
  disabled = false,
  loading = false,
  preventDefault = false,
  theme = ButtonSecondaryTheme.BlueDark,
  onPress
}: ButtonSecondaryProps) => {
  const getIcon = () => {
    switch (icon) {
      case ButtonSecondaryIcon.FunnelFill:
        return <BsFunnelFill className={styles.icon} size={15} />
      case ButtonSecondaryIcon.PersonPlusFill:
        return <BsPersonPlusFill className={styles.icon} size={15} />
      case ButtonSecondaryIcon.SaveOutline:
        return <FiSave className={styles.icon} size={15} />
      case ButtonSecondaryIcon.Plus:
        return <FiPlus className={styles.icon} size={15} />
      case undefined:
        return null
    }
  }

  const onClickButton = (e: FormEvent<HTMLButtonElement>) => {
    if (preventDefault) e.preventDefault() // Force prevent default
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
              <span>{label}</span>
            </>)}
      </button>
    </div>
  )
})

export default ButtonSecondary
