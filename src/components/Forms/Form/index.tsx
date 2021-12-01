import React, { FormEvent, memo } from 'react'

import { FormProps } from './types'

const Form = memo(({
  enablePreventDefault = false,
  onSubmit,
  ...props
}: FormProps) => {
  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    !enablePreventDefault && event.preventDefault()
    onSubmit?.(event)
  }
  return (
    <form {...props} onSubmit={onSubmitForm} />
  )
})

export default Form
