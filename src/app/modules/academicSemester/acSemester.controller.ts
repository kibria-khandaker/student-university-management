import { RequestHandler, Request, Response } from 'express'
// import { RequestHandler} from 'express'
import { AcSemesterService } from './acSemester.service'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { IAcSemester } from './acSemester.interface'
import catchAsync from '../../../shared/catchAsync'

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

export const AcSemesterController = { createSemester }
