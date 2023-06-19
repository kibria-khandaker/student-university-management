import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { acFacultyFilterableFields } from './acFaculty.constant'
import { IAcFaculty } from './acFaculty.interface'
import { AcFacultyService } from './acFaculty.service'
// Faculty Faculties Facultys

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...acFacultyData } = req.body
  const result = await AcFacultyService.createFaculty(acFacultyData)
  sendResponse<IAcFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  })
})

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, acFacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcFacultyService.getAllFaculties(
    filters,
    paginationOptions
  )

  sendResponse<IAcFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  // const id = req.params
  const id = req.params.id

  const result = await AcFacultyService.getSingleFaculty(id)

  sendResponse<IAcFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  // const id = req.params.id
  const updateData = req.body

  const result = await AcFacultyService.updateFaculty(id, updateData)

  sendResponse<IAcFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty update successfully',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  // const id = req.params.id

  const result = await AcFacultyService.deleteFaculty(id)
  sendResponse<IAcFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Deleted successfully',
    data: result,
  })
})

export const AcFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
