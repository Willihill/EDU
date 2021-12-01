import { ClassRoomPushState } from 'store/reducer/ClassRoomReducer/ClassRoomPushReducer/types'

import { dateClone } from 'utils/helpers/Date'

export const classRoomPushHandleError = (data: ClassRoomPushState) => {
  const startDate = dateClone(data.startDate)

  if (!data.code) throw new Error('Código da turma não informado.')
  if (!startDate) throw new Error('Data de inicio invpalida.')
  if (startDate < new Date()) throw new Error('Data de inicio não pode ser inferior a data atual.')
  if (!data.course.id) throw new Error('Curso não selecionado.')
  if (!data.coordinator.id) throw new Error('Coordenador não selecionado.')
}
