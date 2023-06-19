import { Request, Response } from 'express'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'

import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { acDepartmentFilterableFields } from './acDepartment.constant'
import { IAcDepartment } from './acDepartment.interface'
import { AcDepartmentService } from './acDepartment.service'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...acDepartmentData } = req.body
  const result = await AcDepartmentService.createDepartment(acDepartmentData)
  sendResponse<IAcDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department created successfully',
    data: result,
  })
})

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, acDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  )

  sendResponse<IAcDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcDepartmentService.getSingleDepartment(id)
  sendResponse<IAcDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department retrieved successfully',
    data: result,
  })
})

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updateData = req.body
  const result = await AcDepartmentService.updateDepartment(id, updateData)

  sendResponse<IAcDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department update successfully',
    data: result,
  })
})

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcDepartmentService.deleteDepartment(id)
  sendResponse<IAcDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department Deleted successfully',
    data: result,
  })
})

export const AcDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
