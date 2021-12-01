export enum HomeAmountCardIcon {
  Teacher = 'FaChalkboardTeacher',
  Studant = 'FaUserGraduate',
  ClassRoom = 'SiGoogleclassroom'
}

export interface HomeAmountCardProps {
  title: string
  icon: HomeAmountCardIcon
  amount: number
}
