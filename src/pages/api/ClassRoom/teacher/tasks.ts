import { serverGetTeacherTasksService } from 'services/TeacherService/Server'

import { serverApiResponse } from 'utils/api'

export default serverApiResponse(serverGetTeacherTasksService)
