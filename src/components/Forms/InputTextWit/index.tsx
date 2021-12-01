import { forwardRef } from 'react'

import styles from 'styles/components/Forms/InputTextWit/index.module.scss'

import { InputTextWitProps } from './types'

export default forwardRef<HTMLInputElement, InputTextWitProps>(
  ({
    id = Math.random().toString(),
    label = '',
    required = false,
    className = '',
    name,
    type = 'text',
    placeholder = '',
    fontSize,
    onChange,
    onChangeText,
    ...props
  }: InputTextWitProps, ref) => {
    return (
      <div className={`${styles.container} ${className}`}>
        {label && <label htmlFor={id} className={styles.label}>{`${label} ${required ? '*' : ''}`}</label>}
        <input
          ref={ref}
          {...props}
          id={id}
          className={styles.input}
          name={name}
          type={type}
          style={{
            fontSize: fontSize
          }}
          placeholder={placeholder}
          onChange={(e) => onChange ? onChange(e) : onChangeText?.(e.target.value)}
        />
      </div>
    )
  })
