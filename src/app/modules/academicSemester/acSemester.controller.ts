import { Request, Response } from 'express'
// import { RequestHandler} from 'express'
import { AcSemesterService } from './acSemester.service'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { IAcSemester } from './acSemester.interface'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { acSemesterFilterableFields } from './acSemester.constant'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...acSemesterData } = req.body
  const result = await AcSemesterService.createSemester(acSemesterData)
  sendResponse<IAcSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester created successfully',
    data: result,
  })
})

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, acSemesterFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcSemesterService.getAllSemesters(
    filters,
    paginationOptions
  )

  sendResponse<IAcSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcSemesterService.getSingleSemester(id)
  sendResponse<IAcSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully',
    data: result,
  })
})

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updateData = req.body

  const result = await AcSemesterService.updateSemester(id, updateData)
  sendResponse<IAcSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester update successfully',
    data: result,
  })
})

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcSemesterService.deleteSemester(id)
  sendResponse<IAcSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Deleted successfully',
    data: result,
  })
})

export const AcSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
