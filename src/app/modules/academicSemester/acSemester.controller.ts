import { NextFunction, Request, Response } from 'express'
import { AcSemesterService } from './acSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...acSemesterData } = req.body
    const result = await AcSemesterService.createSemester(acSemesterData)
    next()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully',
      data: result,
    })
  }
)
export const AcSemesterController = { createSemester }

/*
import { RequestHandler } from 'express'
import { AcSemesterService } from './acSemester.service'

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...acSemesterData } = req.body
    const result = await AcSemesterService.createSemester(acSemesterData)
    res.status(200).json({
      success: true,
      message: 'Semester created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const AcSemesterController = { createSemester }
*/
