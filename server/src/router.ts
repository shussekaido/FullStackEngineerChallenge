import { log } from './logger'
import express, { Request, Response, NextFunction } from 'express'
import passport from './auth'
import bcrypt from 'bcrypt'
import * as users from './models/users'
import * as blockchain from './blockchain'
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
  // if (isAdmin(req)) {
  try {
    const employees = await users.findAllUsers()
    res.json({ employees })
  } catch(error) {
    log.error(error)
    res.status(500).json(error)
  }
  // } else {
  //   res.status(403).json({ message: 'Forbidden' })
  // }
}

const createEmployee = async (req: Request, res: Response) => {
  // if (isAdmin(req)) {
  try {
    const { username, password } = req.body
    const employee = {
      username: username,
      password: await bcrypt.hash(password, 10),
      role: 'employee',
    }
    const result = await users.createEmployee(employee)
    log.info(`Obtained new user data: ${JSON.stringify(employee)}`)

    // res.json({
    //   data: { employee },
    //   response: result,
    // })
    res.json({ result })
  } catch(error) {
    log.error(error)
    res.status(500).json(error)
  }
  // } else {
  //   res.status(403).json({ message: 'Forbidden' })
  // }
}

const getEmployee = async (req: Request, res: Response) => {
  // if (isAdmin(req)) {
  try {
    const userId = Number(req?.params?.id)
    const employee = await users.findById(userId)
    res.json({ employee })
  } catch(error) {
    log.error(error)
    res.status(500).json(error)
  }
  // } else {
  //   res.status(403).json({ message: 'Forbidden' })
  // }
}

const updateEmployee = async (req: Request, res: Response) => {
  // if (isAdmin(req)) {
  try {
    const userId = Number(req?.params?.id)
    const { username, password } = req?.body
    if (!username || !password) {
      res.status(400).json({ message: 'Username and password must be provided' })
      return
    }
    const employee = {
      id: userId,
      username: username,
      password: await bcrypt.hash(password, 10),
      role: 'employee',
    }
    const result = await users.updateEmployee(employee)
    res.json({ result })
  } catch(error) {
    log.error(error)
    res.status(500).json(error)
  }
  // } else {
  //   res.status(403).json({ message: 'Forbidden' })
  // }
}

const deleteEmployee = async (req: Request, res: Response) => {
  // if (isAdmin(req)) {
  try {
    const userId = Number(req?.params?.id)
    await users.deleteEmployee(userId)
    res.json({ message: 'Successfully deleted'})
  } catch(error) {
    log.error(error)
    res.status(400).json(error)
  }
  // } else {
  //   res.status(403).json({ message: 'Forbidden' })
  // }
}

const listUserReviews = async (req: Request, res: Response) => {
  try {
    const userId = Number(req?.params?.id)
    const query = { 'userId': Number(userId) }
    const result = await blockchain.queryAllRecords(query)
    res.send(result)
  } catch(error) {
    log.error(error)
    res.status(500).json(error)
  }
}

const listAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await blockchain.getAllRecords()
    res.send(result)
  } catch(error) {
    log.error(error)
    res.status(500).json(error)
  }
}

const createReview = async (req: Request, res: Response) => {
  try {
    const record = req?.body
    const result = await blockchain.addRecord(record)
    await blockchain.createProof()
    res.send(result)
  } catch(error) {
    log.error(error)
    res.status(500).json(error)
  }
}

const getReviewById = async (req: Request, res: Response) => {
  try {
    const reviewId = req?.params?.id
    const result = await blockchain.getRecordById(reviewId)
    res.send(result)
  } catch(error) {
    log.error(error)
    res.status(500).json(error)
  }
}

const updateReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req?.params?.id
    const record = req?.body
    const result = await blockchain.updateRecord(reviewId, record)
    res.json({ result })
  } catch(error) {
    log.error(error)
    res.status(500).json(error)
  }
}

const getReviewVersion = async (req: Request, res: Response) => {
  try {
    const query = req?.body
    const result = await blockchain.getRecordVersion(query)
    res.send(result)
  } catch(error) {
    log.error(error)
    res.status(500).json(error)
  }
}

const getProof = async (req: Request, res: Response) => {
  try {
    const result = await blockchain.getProof()
    res.send(result)
  } catch(error) {
    log.error(error)
    res.status(500).json(error)
  }
}

router.get('/login', showLogin)

// router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/me', failureRedirect: '/login', failureFlash: true }))
// router.post('/login', passport.authenticate('local', (req: Request, res: Response) => {
//   // successReturnToOrRedirect: '/me', failureRedirect: '/login', failureFlash: true
//   // if (error) {
//   //   res.status(500).json({ message: 'Login error'})
//   // }
//   log.info(`Logged in user ${req.user}`)
//   res.json('Authenticated')
// }))

router.post('/login', passport.authenticate('local'), (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Invalid username or password.',
    })
  }
  showMe(req, res)
})

// router.get('/me', ensureLoggedIn(), showMe)
// router.get('/employees', ensureLoggedIn(), listEmployees)
// router.post('/employees', ensureLoggedIn(), createEmployee)
// router.get('/employees/:id', ensureLoggedIn(), getEmployee)
// router.put('/employees/:id', ensureLoggedIn(), updateEmployee)
// router.delete('/employees/:id', ensureLoggedIn(), deleteEmployee)
router.get('/me', showMe)
router.get('/employees', listEmployees)
router.post('/employees', createEmployee)
router.get('/employees/:id', getEmployee)
router.put('/employees/:id', updateEmployee)
router.delete('/employees/:id', deleteEmployee)

// router.get('/reviews', ensureLoggedIn(), listReviews)
// router.post('/reviews', ensureLoggedIn(), createReview)
// router.get('/reviews/:id', ensureLoggedIn(), getReview)
router.get('/employees/:id/reviews/', listUserReviews)
router.get('/reviews/', listAllReviews)
router.post('/reviews', createReview)
router.get('/reviews/:id', getReviewById)
router.put('/reviews/:id', updateReview)
router.get('/reviews/:id/version', getReviewVersion)
router.get('/reviews/proof', getProof)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

router.get('/', (req, res) => {
  res.redirect('/me')
})