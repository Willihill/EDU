import HttpBaseServer from 'services/HttpBase/server'

export const putServerLogicalExclusionApi = async (id: string, tipoRegistro: string) =>
  await HttpBaseServer.put('api/ExclusaoLogica', { id, tipoRegistro })
