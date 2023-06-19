import { z } from 'zod'

const createAcDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title Is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
    }),
  }),
})

const updateAcDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
})

export const AcDepartmentValidation = {
  createAcDepartmentZodSchema,
  updateAcDepartmentZodSchema,
}
