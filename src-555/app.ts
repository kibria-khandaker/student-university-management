import cors from 'cors'
// import express, { Application, NextFunction, Request, Response } from 'express'
import express, { Application} from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
const app: Application = express()

// import httpStatus from 'http-status'

app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

// global error Handler
app.use(globalErrorHandler)

// handle not found
// app.use((req: Request, res: Response, next:NextFunction) => {
//     res.status(httpStatus.NOT_FOUND).json({
//     success:false,
//     message:'Not Found',
//     errorMessages:[{
//         // path:'.',
//         path:req.originalUrl,
//         messages:'API Not Found'
//     }]
//     })
//     next()
// })

export default app
