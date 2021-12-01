import useSwrAdapter from 'hooks/useSwrAdapter'

import { getCoursesApi } from 'services/CourseService/Client/api'
import { CourseListFilters, CourseListProps } from 'services/CourseService/types'
import NavigationService from 'services/NavigationService'
import { NavigationRoutes } from 'services/NavigationService/types'

const PREFIX_KEY = '/Admin/Courses/'

const useCourses = (filters: CourseListFilters) => {
  const hookDataProps = useSwrAdapter(
    filters,
    getCoursesApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  const onPressNew = async () => await NavigationService.navigateToRoute(NavigationRoutes.AdminCoursePush)
  const onPressEdit = async ({ id }: CourseListProps) => await NavigationService.navigateToRoute(NavigationRoutes.AdminCoursePushEdit, id)

  return {
    ...hookDataProps,
    onPressNew,
    onPressEdit
  }
}

export default useCourses
