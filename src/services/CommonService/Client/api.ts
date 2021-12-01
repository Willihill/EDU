import HttpBase from 'services/HttpBase'

import { LogicalExclusionType } from './types'

export const putLogicalExclusionApi = async (id: string, type: LogicalExclusionType) =>
  await HttpBase.put('/api/Common/LogicalExclusion', { id, type })
