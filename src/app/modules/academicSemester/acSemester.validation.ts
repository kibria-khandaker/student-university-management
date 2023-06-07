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
    year: z.number({ required_error: 'Year Is required' }),
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

export const AcSemesterValidation = {
  createAcSemesterZodSchema,
}
