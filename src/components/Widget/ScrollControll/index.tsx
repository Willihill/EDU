import React, { memo, useRef } from 'react'

import styles from 'styles/components/Widget/ScrollControll/index.module.scss'

import { ScrollControllDirection, ScrollControllProps } from './types'

const ScrollControll = memo(({
  direction = ScrollControllDirection.Vertical,
  gap = 10,
  children,
  onScroll
}: ScrollControllProps) => {
  const scrollDataRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={scrollDataRef}
      className={styles.container}
    >
      <div
        className={styles.content}
        arial-scrollbar-theme='blue'
        onScroll={onScroll}
        style={{
          flexDirection: direction === ScrollControllDirection.Vertical ? 'column' : 'row',
          gap: gap
        }}
      >
        {children}
      </div>
    </div>
  )
})

export default ScrollControll
