import { log } from './logger'
import { Sequelize, QueryTypes, Op } from 'sequelize'
// import dotenv from 'dotenv'

const sql = new Sequelize(process.env.PG_DATABASE as string, process.env.PG_USERNAME as string, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
})

export async function initDB(): Promise<void> {
  try {
    await sql.authenticate()
    log.info('Connection has been established successfully.')
    await sql.sync({ force: false })
  } catch(error) {
    log.error(error)
  }
}