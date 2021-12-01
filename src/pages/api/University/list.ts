import { serverGetUniversitiesByUserService } from 'services/UniversityService/Server'

import { serverApiResponse } from 'utils/api'

export default serverApiResponse(serverGetUniversitiesByUserService)
