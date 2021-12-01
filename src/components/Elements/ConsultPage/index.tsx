import React from 'react'

import { ButtonIconSmall } from 'components/Forms'
import { ButtonIconSmallIcon, ButtonIconSmallTheme } from 'components/Forms/ButtonIconSmall/types'

import styles from 'styles/components/Elements/ConsultPage/index.module.scss'

import { ConsultPageHeaderProps, ConsultPageProps } from './types'

const ConsultPageContainer = ({ children }: ConsultPageProps) => (
  <div className={styles.container}>
    {children}
  </div>
)

const ConsultPageHeader = ({
  title,
  labelButtonNew,
  onPressFilter,
  onPressNew
}: ConsultPageHeaderProps) => (
  <div className={styles.header}>
    {title && <h1 className={styles.title}>{title}</h1>}

    <div className={styles.actions}>
      {/* <ButtonIconSmall
        label='FILTROS'
        icon={ButtonIconSmallIcon.FunnelFill}
        theme={ButtonIconSmallTheme.BlueDark}
        onPress={onPressFilter}
      /> */}
      {(!!labelButtonNew && onPressNew) && (
        <ButtonIconSmall
          label={labelButtonNew}
          icon={ButtonIconSmallIcon.PersonPlusFill}
          theme={ButtonIconSmallTheme.Green}
          onPress={onPressNew}
        />
      )}
    </div>
  </div>
)

export {
  ConsultPageContainer as Container,
  ConsultPageHeader as Header
}
