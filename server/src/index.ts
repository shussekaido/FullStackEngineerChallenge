import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const env = process.env.NODE_ENV
const API_HOST = process.env.API_HOST as string
const API_PORT = Number(process.env.API_PORT)
const app = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Welcome to main route!')
})

app.get('/error', (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Something went wrong!')
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  res.status(error.status || 500)
  res.json({
    errors: {
      message: error.message,
      // error: env === 'development' ? error.stack : {},
    },
  })
})

// eslint-disable-next-line no-console
app.listen(API_PORT, API_HOST, () => console.log(`Starting on port ${API_PORT}. Environment is: ${env}`))