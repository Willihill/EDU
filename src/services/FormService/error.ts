import { ConfigFormPushProps } from './types'

export const createFormHandleError = (data: ConfigFormPushProps) => {
  if (!data.description) throw new Error('Descrição não informada.')
  if (!data.deadline) throw new Error('Prazo inválido.')
  // if (!data.sections || !data.sections.length) throw new Error('Não há questões neste formulário')
}
