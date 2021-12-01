import { CoursePushProps } from '../types'

export const createCourseHandleError = (data: CoursePushProps) => {
  if (!data.name) throw new Error('Nome não informado.')
  if (!data.duration || data.duration < 0) throw new Error('Duração inválida.')
  if (!data.subjects || !data.subjects.length) throw new Error('Nenhuma matéria informada.')

  data.subjects.forEach((subject, idx) => {
    const duplicate = data.subjects.find((i, _idx) => i.name === subject.name && idx !== _idx)
    if (duplicate) throw new Error(`A matéria ${subject.name} está duplicada.`)
  })
}
