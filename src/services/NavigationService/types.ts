export enum NavigationRoutes {
  Login = '/login',
  Home = '/home',
  Logout = '/logout',
  Invite = '/classroom/invite/',
  AdminHome = '/admin/home',
  AdminCourses = '/admin/courses',
  AdminCoursePush = '/admin/courses/new',
  AdminCoursePushEdit = '/admin/courses/',
  AdminTeachers = '/admin/teachers',
  AdminTeacherPush = '/admin/teachers/new',
  AdminTeacherPushEdit = '/admin/teachers/',
  AdminClassRooms = '/admin/classrooms',
  AdminClassRoomPush = '/admin/classrooms/new',
  AdminClassRoomPushEdit = '/admin/classrooms/',
  TeacherHome = '/teacher/home',
  StudentHome = '/student/home',
  StudentTasks = '/student/tasks',
  StudentClasses = '/student/classes',
  StudentSubjects = '/student/subjects',
  TeacherTasks = '/teacher/tasks',
  TeacherClasses = '/teacher/classes',
  TeacherSubjects = '/teacher/subjects',

  ClassRoomSubjectPushEdit = '/classroom/subject/'
}

export type NavigationParamProps = {
  [key: string]: string | number
} | string | number
