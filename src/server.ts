import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(` : Database Connected`)
    app.listen(config.port, () => {
      logger.info(` : App listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to Database', err)
  }
}
bootstrap()
