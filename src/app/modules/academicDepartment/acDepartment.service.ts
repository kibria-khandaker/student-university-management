import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { acDepartmentSearchableFields } from './acDepartment.constant'
import { IAcDepartment, IAcDepartmentFilter } from './acDepartment.interface'
import { AcDepartment } from './acDepartment.model'

const createDepartment = async (
  payload: IAcDepartment
): Promise<IAcDepartment | null> => {
  const result = (await AcDepartment.create(payload)).populate(
    'academicFaculty'
  )
  return result
}

const getAllDepartments = async (
  filters: IAcDepartmentFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: acDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  // console.log(Object.keys(filtersData))
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

  const result = await AcDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcDepartment.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleDepartment = async (
  id: string
): Promise<IAcDepartment | null> => {
  const result = await AcDepartment.findById(id).populate('academicFaculty')
  return result
}

const updateDepartment = async (
  id: string,
  payload: Partial<IAcDepartment>
): Promise<IAcDepartment | null> => {
  const result = await AcDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('academicFaculty')
  return result
}

const deleteDepartment = async (id: string): Promise<IAcDepartment | null> => {
  const result = await AcDepartment.findByIdAndDelete(id)
  return result
}

export const AcDepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
