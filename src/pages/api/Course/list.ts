import { serverGetCoursesService } from 'services/CourseService/Server'

import { serverApiResponse } from 'utils/api'

export default serverApiResponse(serverGetCoursesService)
