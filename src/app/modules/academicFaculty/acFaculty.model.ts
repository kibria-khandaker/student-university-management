import { Schema, model } from 'mongoose'
import { IAcFaculty, AcFacultyModel } from './acFaculty.interface'

const AcFacultySchema = new Schema<IAcFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AcFaculty = model<IAcFaculty, AcFacultyModel>(
  'AcFaculty',
  AcFacultySchema
)
