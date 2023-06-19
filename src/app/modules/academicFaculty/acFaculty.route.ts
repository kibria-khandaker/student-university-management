import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcFacultyValidation } from './acFaculty.validation'
import { AcFacultyController } from './acFaculty.controller'
// Faculty Faculties Facultys
const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(AcFacultyValidation.createAcFacultyZodSchema)
)

router.get('/:id', AcFacultyController.getSingleFaculty)

router.patch(
  '/:id',
  validateRequest(AcFacultyValidation.updateAcFacultyZodSchema),
  AcFacultyController.updateFaculty
)

router.delete('/:id', AcFacultyController.deleteFaculty)

router.get('/', AcFacultyController.getAllFaculties)

export const AcFacultyRouter = router
