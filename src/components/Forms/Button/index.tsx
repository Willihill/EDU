import React, { FormEvent, memo } from 'react'

import { LoadingIndicator } from 'components/Widget'

import styles from 'styles/components/Forms/Button/index.module.scss'

import { ButtonProps, ButtonTheme } from './types'

const Button = memo(({
  label,
  disabled = false,
  loading = false,
  preventDefault = false,
  theme = ButtonTheme.BlueDark,
  onPress
}: ButtonProps) => {
  const onClickButton = (e: FormEvent<HTMLButtonElement>) => {
    if (preventDefault) e.preventDefault() // Force prevent default
    if (loading || disabled) e.preventDefault()
    else onPress?.()
  }

  return (
    <div className={styles.container}>
      {label === 'Voltar'
        ? <button
            className={styles.button}
            arial-theme={ButtonTheme.White}
            onClick={onClickButton}
            disabled={disabled}
          >
          {loading
            ? <LoadingIndicator />
            : <span>{label}</span>}
          </button>
        : <button
            className={styles.button}
            arial-theme={theme}
            onClick={onClickButton}
            disabled={disabled}
          >
          {loading
            ? <LoadingIndicator />
            : <span>{label}</span>}
        </button>}
    </div>
  )
})

export default Button
