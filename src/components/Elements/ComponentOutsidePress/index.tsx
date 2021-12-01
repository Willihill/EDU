import React, { useRef, useEffect } from 'react'

import DocumentEscapeService from 'services/DocumentEscapeService'
import { EscapeUnsubscription } from 'services/DocumentEscapeService/types'

import { ComponentOutsidePressProps } from './types'

const ComponentOutsidePress = ({
  actived: enabled,
  children,
  onPressOutside,
  ...props
}: ComponentOutsidePressProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const escapeRef = useRef<EscapeUnsubscription | null>(null)

  useEffect(() => {
    document.addEventListener('mousedown', onDocumentPress)

    return () => {
      document.removeEventListener('mousedown', onDocumentPress)
      unsubscriptionEscape()
    }
  }, [])

  useEffect(() => {
    if (!enabled) return unsubscriptionEscape()
    if (escapeRef.current !== null) return

    escapeRef.current = DocumentEscapeService.subscriptionEspace(onPressOutside)
  }, [enabled])

  const onDocumentPress = (event: MouseEvent) =>
    (!containerRef.current?.contains(event.target as any)) && onPressOutside()

  const unsubscriptionEscape = () => {
    escapeRef.current?.()
    escapeRef.current = null
  }

  return <div ref={containerRef} {...props}>{children}</div>
}

export default ComponentOutsidePress
