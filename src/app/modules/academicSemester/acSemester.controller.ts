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
