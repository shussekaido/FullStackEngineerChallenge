import passport from 'passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import * as users from './models/users'
import { log } from './logger'

const Strategy = passportLocal.Strategy


const strategy = new Strategy(
  async function(username, password, cb) {
    try {
      const user: any = await users.findByUsername(username)
      if (!user) {
        return cb(null, false, { message: 'Username not found' })
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        return cb(null, false, { message: 'Password is not correct' })
      }
      return cb(null, user)
    } catch (error) {
      return cb(error)
    }
  },
)

passport.use(strategy)

passport.serializeUser((user: any, cb) => {
  cb(null, user.username)
})

passport.deserializeUser(async (username: string, done) => {
  try {
    const user = await users.findByUsername(username)
    if (!user) {
      return done(new Error('User not found'))
    }
    done(null, user)
  } catch (e) {
    done(e)
  }
})

export default passport