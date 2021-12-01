import { serverAuthenticateUserService } from 'services/AuthService/Server'

import { serverApiResponse } from 'utils/api'

export default serverApiResponse(serverAuthenticateUserService)
