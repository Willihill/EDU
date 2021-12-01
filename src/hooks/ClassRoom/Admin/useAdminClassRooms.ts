import useSwrAdapter from 'hooks/useSwrAdapter'

import { getClassRoomsApi } from 'services/ClassRoomService/Client/api'
import { ClassRoomListProps } from 'services/ClassRoomService/types'
import NavigationService from 'services/NavigationService'
import { NavigationRoutes } from 'services/NavigationService/types'

const PREFIX_KEY = '/Admin/Courses/'

const useAdminClassRooms = (filter?: string) => {
  const hookDataProps = useSwrAdapter(
    filter,
    getClassRoomsApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  const onPressNew = async () => await NavigationService.navigateToRoute(NavigationRoutes.AdminClassRoomPush)
  const onPressEdit = async ({ id }: ClassRoomListProps) => await NavigationService.navigateToRoute(NavigationRoutes.AdminClassRoomPushEdit, id)

  return {
    ...hookDataProps,
    onPressNew,
    onPressEdit
  }
}

export default useAdminClassRooms
