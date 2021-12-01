import React from 'react'

export interface TabPageProps {
  title: string
  disabled?: boolean
  children: React.ReactChild | React.ReactChild[]
}
