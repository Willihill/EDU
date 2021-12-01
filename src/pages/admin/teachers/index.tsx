import React, { useEffect, useState } from 'react'

import { ContainerFetch, ContainerTabPage, FlexGrid, TabPage } from 'components/Elements'
import { ButtonSecondary, InputTextWit } from 'components/Forms'
import { ButtonSecondaryTheme } from 'components/Forms/ButtonSecondary/types'
import { PageLayout } from 'components/Layout'
import { RowActions, TextCopy } from 'components/Widget'

import { useTeachers, useTeachersInvited } from 'hooks/University/Teacher'
import useConfig from 'hooks/useConfig'

import { generateAdminTeacherConsultColumns, generateAdminTeachersInvitedConsultColumns } from 'services/UniversityService/Client'

import { cpfMask } from 'utils/helpers/String'

const AdminTeachersScreen = () => {
  const [host, setHost] = useState('')
  const {
    currentUniversityToken
  } = useConfig()

  const {
    data,
    count,
    error,
    isValidating,
    revalidate
  } = useTeachers()

  const {
    CPF,
    data: inviteds,
    count: invitedsCount,
    error: invitedsError,
    isValidating: invitedsValidating,
    revalidate: revalidateInviteds,
    onChangeAddCPF,
    onPressAddInvite,
    onPressRemoveInvite
  } = useTeachersInvited()

  useEffect(() => {
    setHost(window.location.host)
  }, [])

  return (
    <PageLayout>
      <div
        style={{
          flex: 1,
          paddingTop: 20
        }}
      >
        <ContainerTabPage>
          <TabPage
            key='Teachers'
            title='Professores'
          >
            <ContainerFetch.Container
              countData={count}
              error={error}
              loading={isValidating}
              revalidateData={revalidate}
            >
              <FlexGrid
                data={data}
                columns={generateAdminTeacherConsultColumns()}
              />
            </ContainerFetch.Container>
          </TabPage>
          <TabPage
            key='TeachersInvited'
            title='Convites'
          >
            <h1>Adicionar professor</h1>

            <div
              style={{
                flexDirection: 'row'
              }}
            >
              <div
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  gap: 10
                }}
              >
                <InputTextWit
                  placeholder='CPF para convite'
                  fontSize={12}
                  value={cpfMask(CPF)}
                  onChangeText={onChangeAddCPF}
                />

                <ButtonSecondary
                  label='Convidar'
                  theme={ButtonSecondaryTheme.Green}
                  onPress={onPressAddInvite}
                />
              </div>

              <TextCopy text={`http://${host}/teacher/invite/${currentUniversityToken}`} />
            </div>

            <ContainerFetch.Container
              countData={invitedsCount}
              error={invitedsError}
              loading={invitedsValidating}
              revalidateData={revalidateInviteds}
            >
              <FlexGrid
                data={inviteds}
                columns={generateAdminTeachersInvitedConsultColumns(data => <RowActions onPressRemove={onPressRemoveInvite(data)} />)}
              />
            </ContainerFetch.Container>
          </TabPage>
        </ContainerTabPage>
      </div>
    </PageLayout>
  )
}

export default AdminTeachersScreen
