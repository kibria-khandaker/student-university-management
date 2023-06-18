import express from 'express'
import { AcSemesterRouter } from '../modules/academicSemester/acSemester.route'
import { UserRouter } from '../modules/user/user.route'

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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
