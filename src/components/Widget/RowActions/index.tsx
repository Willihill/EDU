import React, { memo } from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { MdEdit } from 'react-icons/md'

import styles from 'styles/components/Widget/RowActions/index.module.scss'

import LoadingIndicator from '../LoadingIndicator'
import { RowActionsProps } from './types'

const RowActions = memo(({
  isActive = true,
  isExcluding = false,
  onPressEdit,
  onPressEye,
  onPressRemove
}: RowActionsProps) => (
  <div
    className={styles.container}
    arial-excluding={String(isExcluding)}
  >
    {onPressEdit && (
      <div
        className={styles.action}
        title='Editar'
        onClick={onPressEdit}
      >
        <MdEdit className={styles.edit} />
      </div>
    )}

    {onPressEye && (
      <div
        className={styles.action}
        title={isActive ? 'Inativar' : 'Ativar'}
        onClick={onPressEye}
      >
        {isActive
          ? <BsFillEyeSlashFill className={styles.eyeOff} />
          : <BsFillEyeFill className={styles.eyeOff} />}
      </div>
    )}

    {onPressRemove && (
      <div
        className={styles.action}
        title='Remover'
        onClick={onPressRemove}
      >
        <CgClose className={styles.remove} />
      </div>
    )}

    {isExcluding && (
      <div className={styles.loading}>
        <LoadingIndicator size={20} color='var(--blue-dark)' backgroundColor='var(--gray-light)' />
      </div>
    )}
  </div>
))

export default RowActions
