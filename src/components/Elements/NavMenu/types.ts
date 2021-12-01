import { NavigationRoutes } from 'services/NavigationService/types'

export interface NavMenuOptionProps {
  title: string
  route: NavigationRoutes
  icon: React.ReactChild
  onPress: (route: NavigationRoutes) => void
}
