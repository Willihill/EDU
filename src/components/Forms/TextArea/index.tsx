import React from 'react'

import styles from 'styles/components/Forms/TextArea/index.module.scss'

import { TextAreaProps } from './types'

const TextArea = ({
  id = Math.random().toString(),
  label = '',
  required = false,
  value,
  maxLength,
  onChange,
  onChangeText,
  ...props
}: TextAreaProps) => {
  return (
    <div className={`${styles.containerTextarea}`}>
      {(label || maxLength) && (
        <div className={styles.header}>
          {label && <label htmlFor={id} className={styles.label}>{`${label} ${required ? '*' : ''}`}</label>}
          {maxLength && <span className={styles.length}>{value?.toString().length} / {maxLength}</span>}
        </div>
      )}

      <textarea
        {...props}
        id={id}
        className={styles.textarea}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange ? onChange(e) : onChangeText?.(e.target.value)}
      />
    </div>
  )
}

export default TextArea
