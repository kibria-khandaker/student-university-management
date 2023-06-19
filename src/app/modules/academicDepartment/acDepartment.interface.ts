import { Model, Types } from 'mongoose'
import { IAcFaculty } from '../academicFaculty/acFaculty.interface'

export type IAcDepartment = {
  title: string
  academicFaculty: Types.ObjectId | IAcFaculty
}

export type AcDepartmentModel = Model<IAcDepartment, Record<string, unknown>>

export type IAcDepartmentFilter = {
  searchTerm?: string
  academicFaculty?: Types.ObjectId
}
