import express from 'express'
import { AcDepartmentRouter } from '../modules/academicDepartment/acDepartment.route'
import { AcFacultyRouter } from '../modules/academicFaculty/acFaculty.route'
import { AcSemesterRouter } from '../modules/academicSemester/acSemester.route'

import { AdminRoute } from '../modules/admin/admin.route'
import { FacultyRoutes } from '../modules/faculty/faculty.route'
import { UserRouter } from '../modules/user/user.route'
import { StudentRoutes } from '../modules/student/student.route'
import { ManagementDepartmentRoute } from '../modules/managementDepartment/managementDepartment.route'

const router = express.Router()
// router.use('/users', UserRouter)
// router.use('/academic-semester', AcSemesterRouter)
const moduleRoutes = [
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
    path: '/management-departments',
    route: ManagementDepartmentRoute,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoute,
  },
  {
    path: '/users',
    route: UserRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
