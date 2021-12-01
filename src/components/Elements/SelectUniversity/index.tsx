import React from 'react'

import { UniversityCard } from 'components/Cards'
import { Modal } from 'components/Widget'

import { useUniversities } from 'hooks/University'
import useConfig from 'hooks/useConfig'

import styles from 'styles/components/Elements/SelectUniversity/index.module.scss'

const SelectUniversity = () => {
  const {
    currentUniversityId,
    onChangeUniversity
  } = useConfig()

  const {
    data
  } = useUniversities()

  return (
    <Modal
      visible={!currentUniversityId}
      onPressClose={() => {}}
    >
      <div className={styles.container}>
        <h1>Selecione a universidade desejada</h1>

        <div className={styles.universities}>
          {data.map(university => (
            <UniversityCard
              key={university.id}
              {...university}
              onPressUniversity={onChangeUniversity(university)}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default SelectUniversity
