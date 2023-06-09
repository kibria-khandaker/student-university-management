import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
// import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', err => {
  // console.log('Uncaught Exception is detected')
  // errorLogger.error(err)
  console.log(err)
  process.exit(1)
})
let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    // logger.info(` : Database Connected`)
    console.log(` : Database Connected`)
    server = app.listen(config.port, () => {
      // logger.info(` : App listening on port ${config.port}`)
      console.log(` : App listening on port ${config.port}`)
    })
  } catch (err) {
    // errorLogger.error('Failed to Database', err)
    console.log('Failed to Database', err)
  }

  process.on('unhandledRejection', error => {
    console.log(
      'Unhandled Rejection is detected, we are closing our server...!'
    )
    if (server) {
      server.close(() => {
        // errorLogger.error(error)
        console.log(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
bootstrap()

process.on('SIGTERM', () => {
  // logger.info('SIGTERM is received')
  console.log('SIGTERM is received')
  if (server) {
    server.close()
  }
})
