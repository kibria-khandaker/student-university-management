import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
// import { UserRouter } from './app/modules/user/user.route'
// import { AcSemesterRouter } from './app/modules/academicSemester/acSemester.route'
import routers from './app/routes'
// import ApiError from './errors/ApiError'

const app: Application = express()

app.use(cors())
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

export default app
