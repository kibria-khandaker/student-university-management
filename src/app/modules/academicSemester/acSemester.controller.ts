import { RequestHandler, Request, Response, NextFunction } from 'express'
// import { RequestHandler} from 'express'
import { AcSemesterService } from './acSemester.service'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { IAcSemester } from './acSemester.interface'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...acSemesterData } = req.body
    const result = await AcSemesterService.createSemester(acSemesterData)
    sendResponse<IAcSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully',
      data: result,
    })
  }
)

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields)

    const result = await AcSemesterService.getAllSemesters(paginationOptions)

    sendResponse<IAcSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)

export const AcSemesterController = { createSemester, getAllSemesters }
