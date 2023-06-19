import { Model } from 'mongoose'

export type IAcSemesterTitles = 'Autumn' | 'Summer' | 'Fall'
export type IAcSemesterCodes = '01' | '02' | '03'

export type IAcSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcSemester = {
  title: IAcSemesterTitles
  year: string
  code: IAcSemesterCodes
  startMonth: IAcSemesterMonth
  endMonth: IAcSemesterMonth
}

export type AcSemesterModel = Model<IAcSemester>

export type IAcSemesterFilter = {
  searchTerm?: string
}
