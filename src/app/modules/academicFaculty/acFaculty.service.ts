// import httpStatus from 'http-status'
// import ApiError from '../../../errors/ApiError'
import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { acFacultySearchableFields } from './acFaculty.constant'
import { IAcFaculty, IAcFacultyFilter } from './acFaculty.interface'
import { AcFaculty } from './acFaculty.model'
// Faculty Faculties Facultys

const createFaculty = async (
  payload: IAcFaculty
): Promise<IAcFaculty | null> => {
  const result = await AcFaculty.create(payload)
  return result
}

const getAllFaculties = async (
  filters: IAcFacultyFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: acFacultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await AcFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcFaculty.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleFaculty = async (id: string): Promise<IAcFaculty | null> => {
  const result = await AcFaculty.findById(id)
  return result
}

const updateFaculty = async (
  id: string,
  payload: Partial<IAcFaculty>
): Promise<IAcFaculty | null> => {
  const result = await AcFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteFaculty = async (id: string): Promise<IAcFaculty | null> => {
  const result = await AcFaculty.findByIdAndDelete(id)
  return result
}

export const AcFacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
