import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import cookieParser from 'cookie-parser'
// import { UserRouter } from './app/modules/user/user.route'
// import { AcSemesterRouter } from './app/modules/academicSemester/acSemester.route'
import routers from './app/routes'
import httpStatus from 'http-status'
// import { generateFacultyId } from './app/modules/user/user.utils'
// import { generateStudentId } from './app/modules/user/user.utils'
// import ApiError from './errors/ApiError'

const app: Application = express()

app.use(cors())
app.use(cookieParser())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application route ----------
// console.log(app.get('env'));
// console.log(process.env);

// app.use('/api/v1/users', UserRouter)
// app.use('/api/v1/academic-semester', AcSemesterRouter)

app.use('/api/v1/', routers)

// // Testing route or default route
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400,'this is Error from -app.ts-')
//   // next('this is my next error')
//   //   Promise.reject(new Error('Unhandled Promise Rejection'))
// //   console.log(X)
// })

// global error Handler
app.use(globalErrorHandler)

// app.get('/', async (req: Request, res: Response) => {
//   res.send('Hello Started SUM Application!')
// })

// Handle Not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  })
  next()
})

//--------- test creat St Id api
// const acSemester = {
//   code: '01',
//   year: '2025',
// }
// const testId = async () => {
//   // const testId = await generateStudentId(acSemester)
//   const testId = await generateFacultyId()
//   console.log(testId)
// }
// testId()
//---------

export default app
