import { Schema, model } from 'mongoose'
import { IAcSemester, AcSemesterModel } from './acSemester.interface'
import {
  acSemesterCodes,
  acSemesterMonth,
  acSemesterTitles,
} from './acSemester.constant'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const AcSemesterSchema = new Schema<IAcSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: acSemesterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: acSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: acSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: acSemesterMonth,
    },
  },
  {
    timestamps: true,
  }
)

// Handling same Year & same Semester issue
AcSemesterSchema.pre('save', async function (next) {
  const isExist = await AcSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semester is already exist !'
    )
  }
  next()
})

// export
export const AcSemester = model<IAcSemester, AcSemesterModel>(
  'AcSemester',
  AcSemesterSchema
)
