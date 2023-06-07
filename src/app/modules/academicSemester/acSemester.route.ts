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

export const AcSemesterRouter = router
