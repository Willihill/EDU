import { serverGetClassRoomSubjectMessagesService } from 'services/ClassRoomSubjectService/Server'

import { serverApiResponse } from 'utils/api'

export default serverApiResponse(serverGetClassRoomSubjectMessagesService)