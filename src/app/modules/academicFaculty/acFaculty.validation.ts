import { z } from 'zod'
// Faculty Faculties Facultys

const createAcFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title Is required',
    }),
  }),
})

const updateAcFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title Is required',
    }),
  }),
})

export const AcFacultyValidation = {
  createAcFacultyZodSchema,
  updateAcFacultyZodSchema,
}
