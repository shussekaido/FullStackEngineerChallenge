import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { router } from './router'
import { initDB } from './db'
import expressPino from 'express-pino-logger'
import { log } from './logger'

const env = process.env.NODE_ENV
const API_HOST = process.env.API_HOST as string
const API_PORT = Number(process.env.API_PORT)
const app = express()
const expressLogger = expressPino()

app.use(expressLogger)
app.use(express.json())
app.use(cors())

app.use('/api', router)

// app.get('/error', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Something went wrong!')
// })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    log.error(error)
    const status = error.status || 500
    res.status(status).json({
      status,
      message: error.message,
    })
  }
})

void async function main() {
  await initDB()
  app.listen(API_PORT, API_HOST, () => log.info(`Starting on port ${API_PORT}. Environment is: ${env}`))
}()