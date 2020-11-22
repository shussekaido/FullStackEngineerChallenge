import { log } from './logger'
import express, { Request, Response, NextFunction } from 'express'
import passport from './auth'
// import { User } from './models/db'
export const router = express.Router()
import connectEnsureLogin from 'connect-ensure-login'
const ensureLoggedIn = connectEnsureLogin.ensureLoggedIn

const isAdmin = (req: Request) => {
  const user: any = req?.user
  return user.role === 'admin' ? true : false
}

const employees = [
  { id: 0, name: 'Mega Beagle' },
]

const showLogin = async (req: Request, res: Response) => {
  res.send('Please log in....')
}

const showMe = async (req: Request, res: Response) => {
  res.send('Welcome')
}

const listEmployees = async (req: Request, res: Response) => {
  if (isAdmin(req)) {
    res.json({
      data: { employees },
    })
  } else {
    res.status(403).json({ message: 'Forbidden' })
  }
}

const createEmployee = async (req: Request, res: Response) => {
  if (isAdmin(req)) {
    const { id, name } = req.body
    const employee = {
      id,
      name,
    }
    employees.push(employee)

    res.json({
      data: { employee },
    })
  } else {
    res.status(403).json({ message: 'Forbidden' })
  }
}

const getEmployee = async (req: Request, res: Response) => {
  if (isAdmin(req)) {
    const employeeId = Number(req.params.id)
    const employee = employees[employeeId]

    res.json({
      data: { employee },
    })
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
// router.put('/employees', ensureLoggedIn(), updateEmployee)
// router.delete('/employees', ensureLoggedIn(), deleteEmployee)
router.get('/employees/:id', ensureLoggedIn(), getEmployee)

router.get('/reviews', ensureLoggedIn(), listReviews)
// router.post('/reviews', ensureLoggedIn(), createReview)
// router.put('/reviews', ensureLoggedIn(), updateReview)
// router.get('/reviews/:reviewId', ensureLoggedIn(), getReview)