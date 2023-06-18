import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { acSemesterTitleCodeMapper } from './acSemester.constant'
import { IAcSemester } from './acSemester.interface'
import { AcSemester } from './acSemester.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createSemester = async (payload: IAcSemester): Promise<IAcSemester> => {
  if (acSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcSemester.create(payload)
  return result
}

const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await AcSemester.find()
    // .sort({ createdAt: 'desc' })
    // .sort({ year: 'desc' })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcSemesterService = {
  createSemester,
  getAllSemesters,
}
