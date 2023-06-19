import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcSemesterValidation } from './acSemester.validation'
import { AcSemesterController } from './acSemester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcSemesterValidation.createAcSemesterZodSchema),
  AcSemesterController.createSemester
)

router.get('/:id', AcSemesterController.getSingleSemester)

router.patch(
  '/:id',
  validateRequest(AcSemesterValidation.updateAcSemesterZodSchema),
  AcSemesterController.updateSemester
)

router.delete('/:id', AcSemesterController.deleteSemester)

router.get('/', AcSemesterController.getAllSemesters)

export const AcSemesterRouter = router
