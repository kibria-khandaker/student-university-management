import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  acSemesterSearchableFields,
  acSemesterTitleCodeMapper,
} from './acSemester.constant'
import { IAcSemester, IAcSemesterFilter } from './acSemester.interface'
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
  filters: IAcSemesterFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcSemester[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: acSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  console.log(Object.keys(filtersData))
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $option: 'i',
  //         },
  //       },{
  //         code:{
  //           $regex: searchTerm,
  //           $option: 'i',
  //         }
  //       },{
  //         year:{
  //           $regex: searchTerm,
  //           $option: 'i',
  //         }
  //       }
  //     ],
  //   },
  // ]

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await AcSemester.find(whereConditions)
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

const getSingleSemester = async (id: string): Promise<IAcSemester | null> => {
  const result = await AcSemester.findById(id)
  return result
}

const updateSemester = async (
  id: string,
  payload: Partial<IAcSemester>
): Promise<IAcSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    acSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }

  const result = await AcSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteSemester = async (id: string): Promise<IAcSemester | null> => {
  const result = await AcSemester.findByIdAndDelete(id)
  return result
}

export const AcSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
