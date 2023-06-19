import { Schema, model } from 'mongoose'
import { AcDepartmentModel, IAcDepartment } from './acDepartment.interface'

const AcDepartmentSchema = new Schema<IAcDepartment, AcDepartmentModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AcDepartment = model<IAcDepartment, AcDepartmentModel>(
  'AcDepartment',
  AcDepartmentSchema
)
