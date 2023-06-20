import express from 'express'
import { AcSemesterRouter } from '../modules/academicSemester/acSemester.route'
import { UserRouter } from '../modules/user/user.route'
import { AcDepartmentRouter } from '../modules/academicDepartment/acDepartment.route'
import { AcFacultyRouter } from '../modules/academicFaculty/acFaculty.route'
import { StudentRoutes } from '../modules/student/student.route'

const router = express.Router()
// router.use('/users', UserRouter)
// router.use('/academic-semester', AcSemesterRouter)
const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/academic-semester',
    route: AcSemesterRouter,
  },
  {
    path: '/academic-faculty/',
    route: AcFacultyRouter,
  },
  {
    path: '/academic-department',
    route: AcDepartmentRouter,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
