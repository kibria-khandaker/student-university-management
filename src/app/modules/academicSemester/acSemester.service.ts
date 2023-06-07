import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { acSemesterTitleCodeMapper } from './acSemester.constant'
import { IAcSemester } from './acSemester.interface'
import { AcSemester } from './acSemester.model'

const createSemester = async (payload: IAcSemester): Promise<IAcSemester> => {
  if (acSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcSemester.create(payload)
  return result
}

export const AcSemesterService = {
  createSemester,
}
