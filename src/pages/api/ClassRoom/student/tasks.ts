import { serverGetStudentTasksService } from 'services/StudentService/Server'

import { serverApiResponse } from 'utils/api'

export default serverApiResponse(serverGetStudentTasksService)
