import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcDepartmentController } from './acDepartment.controller'
import { AcDepartmentValidation } from './acDepartment.validation'
//  Department
const router = express.Router()

router.post(
  '/create-department',
  validateRequest(AcDepartmentValidation.createAcDepartmentZodSchema),
  AcDepartmentController.createDepartment
)

router.get('/:id', AcDepartmentController.getSingleDepartment)

router.patch(
  '/:id',
  validateRequest(AcDepartmentValidation.updateAcDepartmentZodSchema),
  AcDepartmentController.updateDepartment
)

router.delete('/:id', AcDepartmentController.deleteDepartment)

router.get('/', AcDepartmentController.getAllDepartments)

export const AcDepartmentRouter = router
