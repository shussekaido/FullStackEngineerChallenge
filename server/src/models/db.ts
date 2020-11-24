import { log } from '../logger'
import { Sequelize, DataTypes } from 'sequelize'
// import { User } from './models/user'
import bcrypt from 'bcrypt'
const password = process.env.LOGIN_PASSWORD

export const sequelize = new Sequelize(process.env.PG_DATABASE as string, process.env.PG_USERNAME as string, process.env.PG_PASSWORD, {
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

export const User = sequelize.define('user',
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    tableName: 'user',
    freezeTableName: true,
  },
)

async function seed() {
  const hashedPassword = await bcrypt.hash(password, 10)

  return Promise.all([
    User.create({
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    }),
    User.create({
      username: 'MaBeagle',
      password: hashedPassword,
      role: 'employee',
    }),
    User.create({
      username: 'Gearloose',
      password: hashedPassword,
      role: 'employee',
    }),
    User.create({
      username: 'BigtimeBeagle',
      password: hashedPassword,
      role: 'employee',
    }),
    log.info('Database seeded successfully'),
  ])
}

export async function initDB(): Promise<void> {
  try {
    await sequelize.authenticate()
    log.info('Connection to DB has been established successfully.')
    const flushDB = process.env.PG_RESEED === 'true' ? true : false
    await sequelize.sync({ force: flushDB }) // 'force' flushes and recreates tables on restart
    await seed()
  } catch(error) {
    log.error(error)
  }
}

export const findByUsername = async (username: string) => {
  try {
    return await User.findOne({ where: { username: username } })
  } catch(error) {
    log.error(error)
  }
}

export const getAllUsers = async () => {
  try {
    return await User.findAll()
  } catch(error) {
    log.error(error)
  }
}