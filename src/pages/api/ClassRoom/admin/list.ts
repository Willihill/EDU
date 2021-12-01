import { serverGetClassRoomsService } from 'services/ClassRoomService/Server'

import { serverApiResponse } from 'utils/api'

export default serverApiResponse(serverGetClassRoomsService)
