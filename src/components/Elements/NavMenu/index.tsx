import React from 'react'
import { BsPlayCircle } from 'react-icons/bs'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { GiBookshelf } from 'react-icons/gi'
import { GoHome } from 'react-icons/go'
import { IoIosLogOut } from 'react-icons/io'
import { SiGoogleclassroom } from 'react-icons/si'
import { VscSymbolClass, VscTasklist } from 'react-icons/vsc'

import { useRouter } from 'next/router'

import useConfig from 'hooks/useConfig'

import { UserVisualizationType } from 'services/AuthService/types'
import NavigationService from 'services/NavigationService'
import { NavigationRoutes } from 'services/NavigationService/types'

import styles from 'styles/components/Elements/NavMenu/index.module.scss'

import { NavMenuOptionProps } from './types'

const NavMenuOption = ({
  title,
  route,
  icon,
  onPress
}: NavMenuOptionProps) => {
  const {
    route: urlRouter
  } = useRouter()

  return (
    <div
      className={styles.option}
      arial-selected={String(urlRouter.toLocaleLowerCase().includes(route.toString().toLocaleLowerCase()))}
      onClick={() => onPress(route)}
    >
      {icon}
      <span>{title}</span>
    </div>
  )
}

const NavMenu = () => {
  const { userVisualizationType } = useConfig()

  const onPressOption = async (route: NavigationRoutes) => await NavigationService.navigateToRoute(route)

  return (
    <div className={styles.container}>
      <img
        src='/assets/images/logo-favicon-purple.svg'
        className={styles.logo}
      />

      <div className={styles.menu}>
        {userVisualizationType === UserVisualizationType.Admin && (
          <>
            <NavMenuOption title='Home' route={NavigationRoutes.AdminHome} icon={<GoHome />} onPress={onPressOption} />
            <NavMenuOption title='Professores' route={NavigationRoutes.AdminTeachers} icon={<FaChalkboardTeacher />} onPress={onPressOption} />
            <NavMenuOption title='Cursos' route={NavigationRoutes.AdminCourses} icon={<VscSymbolClass />} onPress={onPressOption} />
            <NavMenuOption title='Turmas' route={NavigationRoutes.AdminClassRooms} icon={<SiGoogleclassroom />} onPress={onPressOption} />
          </>
        )}

        {userVisualizationType === UserVisualizationType.Student && (
          <>
            <NavMenuOption title='Home' route={NavigationRoutes.StudentHome} icon={<GoHome />} onPress={onPressOption} />
            <NavMenuOption title='Atividades' route={NavigationRoutes.StudentTasks} icon={<VscTasklist />} onPress={onPressOption} />
            <NavMenuOption title='Aulas' route={NavigationRoutes.StudentClasses} icon={<BsPlayCircle />} onPress={onPressOption} />
            <NavMenuOption title='Matérias' route={NavigationRoutes.StudentSubjects} icon={<GiBookshelf />} onPress={onPressOption} />
          </>
        )}

        {userVisualizationType === UserVisualizationType.Teacher && (
          <>
            <NavMenuOption title='Home' route={NavigationRoutes.TeacherHome} icon={<GoHome />} onPress={onPressOption} />
            <NavMenuOption title='Atividades' route={NavigationRoutes.TeacherTasks} icon={<VscTasklist />} onPress={onPressOption} />
            <NavMenuOption title='Aulas' route={NavigationRoutes.TeacherClasses} icon={<BsPlayCircle />} onPress={onPressOption} />
            <NavMenuOption title='Matérias' route={NavigationRoutes.TeacherSubjects} icon={<GiBookshelf />} onPress={onPressOption} />
          </>
        )}

        <NavMenuOption title='Sair' route={NavigationRoutes.Logout} icon={<IoIosLogOut />} onPress={onPressOption} />
      </div>
    </div>
  )
}

export default NavMenu
