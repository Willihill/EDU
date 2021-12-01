import { NextApiRequest } from 'next'

import { putServerLogicalExclusionApi } from './api'

export const serverPutLogicalExclusionService = async (req: NextApiRequest) =>
  await putServerLogicalExclusionApi(req.body.id, req.body.type)
