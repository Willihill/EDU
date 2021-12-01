import { serverGetTeacherMonthClassesService } from 'services/TeacherService/Server'

import { serverApiResponse } from 'utils/api'

export default serverApiResponse(serverGetTeacherMonthClassesService)
