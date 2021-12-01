import { forwardRef } from 'react'

import styles from 'styles/components/Forms/InputText/index.module.scss'

import { InputTextProps } from './types'

export default forwardRef<HTMLInputElement, InputTextProps>(
  ({
    label = '',
    required = false,
    className = '',
    name,
    id = Math.random().toString(),
    onChange,
    onChangeText,
    type = 'text',
    ...props
  }: InputTextProps, ref) => {
    return (
      <div className={`${styles.container} ${className}`}>
        {label && <label htmlFor={id} className={styles.label}>{`${label} ${required ? '*' : ''}`}</label>}
        <input
          ref={ref}
          {...props}
          id={id}
          name={name}
          type={type}
          className={styles.input}
          onChange={(e) => onChange ? onChange(e) : onChangeText?.(e.target.value)}
        />
      </div>
    )
  })
