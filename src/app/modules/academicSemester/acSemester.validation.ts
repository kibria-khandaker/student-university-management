import { z } from 'zod'
import {
  acSemesterCodes,
  acSemesterMonth,
  acSemesterTitles,
} from './acSemester.constant'

const createAcSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...acSemesterTitles] as [string, ...string[]], {
      required_error: 'title Is required',
    }),
    year: z.string({ required_error: 'Year Is required' }),
    code: z.enum([...acSemesterCodes] as [string, ...string[]], {
      required_error: 'code Is required',
    }),
    startMonth: z.enum([...acSemesterMonth] as [string, ...string[]], {
      required_error: 'Start Month Is required',
    }),
    endMonth: z.enum([...acSemesterMonth] as [string, ...string[]], {
      required_error: 'End Month Is required',
    }),
  }),
})

const updateAcSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...acSemesterTitles] as [string, ...string[]], {
          required_error: 'title Is required',
        })
        .optional(),

      year: z.string({ required_error: 'Year Is required' }).optional(),

      code: z
        .enum([...acSemesterCodes] as [string, ...string[]], {
          required_error: 'code Is required',
        })
        .optional(),

      startMonth: z
        .enum([...acSemesterMonth] as [string, ...string[]], {
          required_error: 'Start Month Is required',
        })
        .optional(),

      endMonth: z
        .enum([...acSemesterMonth] as [string, ...string[]], {
          required_error: 'End Month Is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Title and Code both should be provide for change ',
    }
  )

export const AcSemesterValidation = {
  createAcSemesterZodSchema,
  updateAcSemesterZodSchema,
}
