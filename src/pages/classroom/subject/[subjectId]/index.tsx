import React, { useEffect } from 'react'

import { GetServerSidePropsContext } from 'next'

import { FeedMessageCard } from 'components/Cards'
import { ContainerFetch, ContainerTabPage, FlexGrid, TabPage } from 'components/Elements'
import { ButtonSecondary, InputTextWit, TextArea } from 'components/Forms'
import { ButtonSecondaryIcon, ButtonSecondaryTheme } from 'components/Forms/ButtonSecondary/types'
import { PageLayout } from 'components/Layout'
import { TaskStatus } from 'components/Widget'

import { useClassRoomSubject, useClassRoomSubjectClasses, useClassRoomSubjectMessages, useClassRoomSubjectTasks } from 'hooks/ClassRoom/Subject'
import useConfig from 'hooks/useConfig'

import { getJwtPayloadService } from 'services/AuthService'
import { generateClassRoomSubjectClasseColumns, generateClassRoomSubjectTaskColumns } from 'services/ClassRoomSubjectService/Client'
import { serverGetClassRoomSubjectDataService } from 'services/ClassRoomSubjectService/Server'
import { ClassRoomSubjectDataProps } from 'services/ClassRoomSubjectService/types'

import styles from 'styles/pages/ClassRoom/Subject/index.module.scss'

import { PageRegisterProps } from 'utils/common/types'
import { parseNumeric } from 'utils/helpers/Number'
import { asyncPromiseSimple } from 'utils/helpers/Promise'

const ClassRoomSubjectScreen = (props: PageRegisterProps<ClassRoomSubjectDataProps>) => {
  const {
    isTeacher
  } = useConfig()

  const {
    id,
    name,
    teacherName,
    setClassRoomSubjectData
  } = useClassRoomSubject()

  const {
    data: messages,
    count: messagesCount,
    error: messagesError,
    isValidating: isValidatingMessages,
    revalidate: revalidateMessages,
    newMessage,
    setNewMessage,
    onPressSendMessage
  } = useClassRoomSubjectMessages(id)

  const {
    data: classes,
    count: classesCount,
    error: classesError,
    isValidating: isValidatingClasses,
    revalidate: revalidateClasses
  } = useClassRoomSubjectClasses(id)

  const {
    data: tasks,
    count: tasksCount,
    error: tasksError,
    isValidating: isValidatingTasks,
    revalidate: revalidateTasks,
    onPressNew,
    onPressEdit,
    onPresTask
  } = useClassRoomSubjectTasks(id)

  useEffect(() => {
    props.data && setClassRoomSubjectData(props.data)

    revalidateMessages()
    revalidateClasses()
    revalidateTasks()
  }, [])

  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <InputTextWit
            placeholder='Nome'
            disabled
            fontSize={20}
            value={name}
          />

          <div className={styles.bottomHeader}>
            <div className={styles.bottomHeaderContent}>
              <InputTextWit
                label='Professor'
                disabled
                fontSize={16}
                value={teacherName}
              />

            </div>
          </div>
        </div>

        <div className={styles.content}>
          <ContainerTabPage>
            <TabPage
              title='Feed'
            >
              <div className={styles.newMessage}>
                <TextArea
                  placeholder='Digite a mensagem desejada'
                  value={newMessage}
                  onChangeText={setNewMessage}
                />
                <div>
                  <ButtonSecondary
                    label='Enviar'
                    onPress={onPressSendMessage}
                  />
                </div>
              </div>

              <ContainerFetch.Container
                countData={messagesCount}
                error={messagesError}
                loading={isValidatingMessages}
              >
                <div className={styles.feedMessages}>
                  {messages.map((message, idx) => (
                    <FeedMessageCard
                      key={idx}
                      {...message}
                    />
                  ))}
                </div>
              </ContainerFetch.Container>
            </TabPage>
            <TabPage
              title='Atividades'
            >
              <>
                {isTeacher && (
                  <div>
                    <ButtonSecondary
                      label='Adicionar atividade'
                      icon={ButtonSecondaryIcon.Plus}
                      theme={ButtonSecondaryTheme.Green}
                      onPress={onPressNew}
                    />
                  </div>
                )}

                <ContainerFetch.Container
                  countData={tasksCount}
                  error={tasksError}
                  loading={isValidatingTasks}
                >
                  <FlexGrid
                    data={tasks}
                    onPressRow={isTeacher ? onPressEdit : onPresTask}
                    columns={generateClassRoomSubjectTaskColumns(data => <TaskStatus {...data} />)}
                  />
                </ContainerFetch.Container>
              </>
            </TabPage>
            <TabPage
              title='Aulas'
            >
              <ContainerFetch.Container
                countData={classesCount}
                error={classesError}
                loading={isValidatingClasses}
              >
                <FlexGrid
                  data={classes}
                  columns={generateClassRoomSubjectClasseColumns()}
                />
              </ContainerFetch.Container>
            </TabPage>
          </ContainerTabPage>
        </div>
      </div>
    </PageLayout>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = parseNumeric(context.params?.subjectId as string)
  const pageProps: PageRegisterProps<ClassRoomSubjectDataProps> = {
    isNotFound: false,
    isNew: context.params?.id?.toString().toLowerCase() === 'new'
  }

  if (!pageProps.isNew && id) {
    const tokenPayload = getJwtPayloadService(context)
    const { err, resp } = await asyncPromiseSimple(serverGetClassRoomSubjectDataService(id, tokenPayload))

    // TODO Quando não existir retornar para 404
    if (!resp) throw new Error(err?.message)

    pageProps.data = resp
  }

  return {
    props: pageProps
  }
}

export default ClassRoomSubjectScreen
