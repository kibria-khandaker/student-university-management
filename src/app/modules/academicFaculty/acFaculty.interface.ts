import { Model } from 'mongoose'

export type IAcFaculty = {
  title: string
}

export type AcFacultyModel = Model<IAcFaculty, Record<string, unknown>>

export type IAcFacultyFilter = {
  searchTerm?: string
}
