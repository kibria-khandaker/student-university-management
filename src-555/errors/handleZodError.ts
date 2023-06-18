import { ZodError, ZodIssue } from 'zod'
import { iGenericErrorResponse } from '../interfaces/common'
import { iGenericErrorMessage } from '../interfaces/error'

const handleZodError = (error: ZodError): iGenericErrorResponse => {
  // console.log(error.issues.map((issue)=>issue.path), "From Zod Error");

  const errors: iGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}
export default handleZodError


