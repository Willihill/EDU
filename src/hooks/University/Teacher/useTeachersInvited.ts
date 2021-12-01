import { useState } from 'react'

import useSwrAdapter from 'hooks/useSwrAdapter'

import { pushUniversityTeacherInviteService, removeUniversityTeacherInviteService } from 'services/UniversityService/Client'
import { getUniversityTeachersInvitedApi } from 'services/UniversityService/Client/api'
import { UniversityTeacherInviteListProps } from 'services/UniversityService/types'

import { cpfRemoveCaracter } from 'utils/helpers/String'

const PREFIX_KEY = '/Admin/Teachers/Invited/'

const useTeachersInvited = () => {
  const [CPF, setCPF] = useState('')

  const hookDataProps = useSwrAdapter(
    null,
    getUniversityTeachersInvitedApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  const onChangeAddCPF = (data: string) => setCPF(cpfRemoveCaracter(data))
  const onPressAddInvite = async () =>
    await pushUniversityTeacherInviteService(CPF, () => {
      setCPF('')
      hookDataProps.revalidate()
    })

  const onPressRemoveInvite = (data: UniversityTeacherInviteListProps) =>
    async () => await removeUniversityTeacherInviteService(data, () => { hookDataProps.revalidate() })

  return {
    ...hookDataProps,
    CPF,
    onChangeAddCPF,
    onPressAddInvite,
    onPressRemoveInvite
  }
}

export default useTeachersInvited
