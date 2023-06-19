import mongoose from 'mongoose'
import { iGenericErrorMessage } from '../interfaces/error'

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: iGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'invalid id',
    },
  ]

  const statusCode = 400

  return {
    statusCode,
    message: 'CastError Error',
    errorMessages: errors,
  }
}

export default handleCastError
