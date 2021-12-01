import React, { useEffect, useRef, ChangeEvent } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'

import styles from 'styles/components/Forms/InputSpinner/index.module.scss'

import { roundBetween } from 'utils/helpers/Number'
import { currencyInput, onlyNumber } from 'utils/helpers/String'

import { InputSpinnerProps } from './types'

const InputSpinner = ({
  id = Math.random().toString(),
  required = false,
  disabled = false,
  label,
  value,
  step = 1,
  min = 0,
  max = 9999999,
  decimalPrecision = 0,
  onChangeValue
}: InputSpinnerProps) => {
  const inputElementRef = useRef<HTMLInputElement>()
  const timeoutMinusRef = useRef<NodeJS.Timer>()
  const timeoutPlusRef = useRef<NodeJS.Timer>()

  useEffect(() => {
    populateInputElement()
    if (inputElementRef.current) inputElementRef.current.value = currencyInput(buildRoundValueBetween(value), { precision: decimalPrecision })
  }, [value])

  const populateInputElement = () => {
    if (!inputElementRef.current) inputElementRef.current = document.getElementById(id) as HTMLInputElement
  }

  const buildRoundValueBetween = (value: string | number) =>
    roundBetween(Number(onlyNumber(value.toString())), min * Math.max(decimalPrecision, 1), max * Math.max(decimalPrecision, 1))

  const decrementStepValue = () => {
    if (!inputElementRef.current) return
    const numberValue = Number(onlyNumber(inputElementRef.current.value))
    inputElementRef.current.value = currencyInput(buildRoundValueBetween(numberValue - (step * Math.max(decimalPrecision, 1))), { precision: decimalPrecision })
  }

  const incrementStepValue = () => {
    if (!inputElementRef.current) return
    const numberValue = Number(onlyNumber(inputElementRef.current.value))
    inputElementRef.current.value = currencyInput(buildRoundValueBetween(numberValue + (step * Math.max(decimalPrecision, 1))), { precision: decimalPrecision })
  }

  const callChangeValueState = () => {
    populateInputElement()
    if (!inputElementRef.current) return
    const numberValue = buildRoundValueBetween(inputElementRef.current.value)
    onChangeValue?.(numberValue)
  }

  const onMouseDownMinus = () => {
    if (disabled) return
    populateInputElement()
    decrementStepValue()

    timeoutMinusRef.current = setInterval(() => {
      decrementStepValue()
    }, 100)
  }

  const onMouseUpMinus = () => {
    if (!timeoutMinusRef.current) return
    clearInterval(timeoutMinusRef.current)
    callChangeValueState()
  }

  const onMouseDownPlus = () => {
    if (disabled) return
    populateInputElement()
    incrementStepValue()

    timeoutPlusRef.current = setInterval(() => {
      incrementStepValue()
    }, 100)
  }

  const onMouseUpPlus = () => {
    if (!timeoutPlusRef.current) return
    clearInterval(timeoutPlusRef.current)
    callChangeValueState()
  }

  const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    populateInputElement()
    if (!inputElementRef.current) return
    const numberValue = buildRoundValueBetween(onlyNumber(event.target.value))
    inputElementRef.current.value = currencyInput(numberValue, { precision: decimalPrecision })
    callChangeValueState()
  }

  return (
    <div
      className={styles.container}
      arial-disabled={String(disabled)}
    >
      {label && <label htmlFor={id} className={styles.label}>{`${label} ${required ? '*' : ''}`}</label>}
      <div className={styles.content}>
        <div
          className={styles.action}
          title='Diminuir'
          onMouseDown={onMouseDownMinus}
          onMouseUp={onMouseUpMinus}
        >
          <FiMinus className={styles.icon} />
        </div>

        <input
          id={id}
          type='text'
          className={styles.input}
          defaultValue={currencyInput(value, { precision: decimalPrecision })}
          onChange={onChangeInputValue}
          disabled={disabled}
        />

        <div
          className={styles.action}
          title='Aumentar'
          onMouseDown={onMouseDownPlus}
          onMouseUp={onMouseUpPlus}
        >
          <FiPlus className={styles.icon} />
        </div>
      </div>
    </div>
  )
}

export default InputSpinner
