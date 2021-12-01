import { UniversityProps } from 'services/UniversityService/types'

export interface UniversityCardProps extends UniversityProps {
  size?: number
  onPressUniversity?: () => void
}
