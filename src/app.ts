import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

import usersService from './app/modules/users/users.service'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  await usersService.createUser({
    id: '999',
    password: '12345',
    role: 'student',
  })
  res.send('Hello Started SUM Application!')
})

export default app

// st_university_management
// 5j9xYPXDpcTT2v5b
