import { useEffect, useRef, useState } from 'react'

import useSwrAdapter from 'hooks/useSwrAdapter'

import { sendClassRoomSubjectMessageService } from 'services/ClassRoomSubjectService/Client'
import { getClassRoomSubjectMessagesApi } from 'services/ClassRoomSubjectService/Client/api'

const PREFIX_KEY = '/Student/ClassRoom/Subjects/Messages/'

const useClassRoomSubjectMessages = (classRoomSubjectId: number) => {
  const [newMessage, setNewMessage] = useState('')
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timerRef.current = setInterval(() => {
      hookDataProps.revalidate()
    }, 10000)
    // }, 300000)

    return () => timerRef.current && clearInterval(timerRef.current)
  }, [])

  const hookDataProps = useSwrAdapter(
    classRoomSubjectId,
    getClassRoomSubjectMessagesApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  const onPressSendMessage = async () => await sendClassRoomSubjectMessageService(
    classRoomSubjectId,
    newMessage,
    () => {
      setNewMessage('')
      hookDataProps.revalidate()
    }
  )

  return {
    ...hookDataProps,
    newMessage,
    setNewMessage,
    onPressSendMessage
  }
}

export default useClassRoomSubjectMessages
