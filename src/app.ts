import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

            app.use(cors())
                    app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: any) => {
  res.send('Hello I am SUM Application!')
})

export default app

// st_university_management
// 5j9xYPXDpcTT2v5b
