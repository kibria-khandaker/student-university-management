import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcFacultyValidation } from './acFaculty.validation'
import { AcFacultyController } from './acFaculty.controller'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
// Faculty Faculties Facultys
const router = express.Router()

router.post(
  '/create-faculty/',
  validateRequest(AcFacultyValidation.createAcFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcFacultyController.createFaculty
)

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AcFacultyController.getSingleFaculty
)

router.patch(
  '/:id',
  validateRequest(AcFacultyValidation.updateAcFacultyZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  AcFacultyController.updateFaculty
)

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcFacultyController.deleteFaculty
)

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  AcFacultyController.getAllFaculties
)

export const AcFacultyRouter = router
