import { log } from './logger'
import express, { Request, Response, NextFunction } from 'express'
import passport from './auth'
import bcrypt from 'bcrypt'
// import { User } from './models/db'
import * as users from './models/users'
export const router = express.Router()
import connectEnsureLogin from 'connect-ensure-login'
const ensureLoggedIn = connectEnsureLogin.ensureLoggedIn

const isAdmin = (req: Request) => {
  const user: any = req?.user
  return user.role === 'admin' ? true : false
}

const showLogin = async (req: Request, res: Response) => {
  res.send('Please log in....')
}

const showMe = async (req: Request, res: Response) => {
  res.send('Welcome')
}

const listEmployees = async (req: Request, res: Response) => {
  if (isAdmin(req)) {
    try {
      const employees = await users.findAllUsers()
      res.json({
        data: { employees },
      })
    } catch(error) {
      log.error(error)
      res.status(500).json(error)
    }
  } else {
    res.status(403).json({ message: 'Forbidden' })
  }
}

const createEmployee = async (req: Request, res: Response) => {
  if (isAdmin(req)) {
    try {
      const { username, password } = req.body
      const employee = {
        username: username,
        password: await bcrypt.hash(password, 10),
        role: 'employee',
      }
      const result = await users.createEmployee(employee)
      log.info(`Obtained new user data: ${JSON.stringify(employee)}`)

      res.json({
        data: { employee },
        response: result,
      })
    } catch(error) {
      log.error(error)
      res.status(500).json(error)
    }
  } else {
    res.status(403).json({ message: 'Forbidden' })
  }
}

const getEmployee = async (req: Request, res: Response) => {
  if (isAdmin(req)) {
    try {
      const employeeId = Number(req?.params?.id)
      const employee = await users.findById(employeeId)
      res.json({
        data: { employee },
      })
    } catch(error) {
      log.error(error)
      res.status(500).json(error)
    }
  } else {
    res.status(403).json({ message: 'Forbidden' })
  }
}

const updateEmployee = async (req: Request, res: Response) => {
  if (isAdmin(req)) {
    try {
      const employeeId = Number(req?.params?.id)
      const { username, password } = req?.body
      if (!username || !password) {
        res.status(400).json({ message: 'Username and password must be provided' })
      }
      const employee = {
        id: employeeId,
        username: username,
        password: await bcrypt.hash(password, 10),
        role: 'employee',
      }
      const result = await users.updateEmployee(employee)
      res.json({
        data: { result },
      })
    } catch(error) {
      log.error(error)
      res.status(500).json(error)
    }
  } else {
    res.status(403).json({ message: 'Forbidden' })
  }
}

const deleteEmployee = async (req: Request, res: Response) => {
  if (isAdmin(req)) {
    try {
      const employeeId = Number(req?.params?.id)
      await users.deleteEmployee(employeeId)
      res.json({ message: 'Successfully deleted'})
    } catch(error) {
      log.error(error)
      res.status(400).json(error)
    }
  } else {
    res.status(403).json({ message: 'Forbidden' })
  }
}

const listReviews = async (req: Request, res: Response) => {
  /** Disable access */
  res.status(403).json({
    message: 'Forbidden',
  })
}

router.get('/login', showLogin)

router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/me', failureRedirect: '/login', failureFlash: true }))

router.get('/me', ensureLoggedIn(), showMe)


router.get('/employees', ensureLoggedIn(), listEmployees)

router.post('/employees', ensureLoggedIn(), createEmployee)
router.get('/employees/:id', ensureLoggedIn(), getEmployee)
router.put('/employees/:id', ensureLoggedIn(), updateEmployee)
router.delete('/employees/:id', ensureLoggedIn(), deleteEmployee)

router.get('/reviews', ensureLoggedIn(), listReviews)
// router.post('/reviews', ensureLoggedIn(), createReview)
// router.put('/reviews', ensureLoggedIn(), updateReview)
// router.get('/reviews/:reviewId', ensureLoggedIn(), getReview)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

router.get('/', (req, res) => {
  res.redirect('/me')
})