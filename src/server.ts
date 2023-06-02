import mongoose from 'mongoose'
import config from './config/index'
import app from './app'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(` : Database Connected`)
    app.listen(config.port, () => {
      console.log(` : App listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('Failed to Database', error)
  }
}
bootstrap()
