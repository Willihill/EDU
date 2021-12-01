import { signUpUserService } from 'services/AuthService/Server'

import { serverApiResponse } from 'utils/api'

export default serverApiResponse(signUpUserService)
