import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { router } from './router'
import { initDB } from './models/db'
import { initBlockchain } from './blockchain'
import expressPino from 'express-pino-logger'
import { log } from './logger'
import helmet from 'helmet'
import passport from './auth'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import flash from 'connect-flash'

const env = process.env.NODE_ENV
const API_HOST = process.env.API_HOST as string
const API_PORT = Number(process.env.API_PORT)
const app = express()
const expressLogger = expressPino()

app.use(expressLogger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(cookieParser())

app.use(expressSession({
  secret: 'very obscure secret',
  resave: true,
  rolling: true,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', router)

app.use((error: any, req: Request, res: Response) => {
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
  await initBlockchain()
  app.listen(API_PORT, API_HOST, () => log.info(`Starting on port ${API_PORT}. Environment is: ${env}`))
}()