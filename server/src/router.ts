import express, { Request, Response, NextFunction } from 'express'
export const router = express.Router()

const employees = [
  { id: 0, name: 'Mega Beagle' },
]

const listEmployees = async (req: Request, res: Response) => {
  res.json({
    data: { employees },
  })
}

const createEmployee = async (req: Request, res: Response) => {
  const { id, name } = req.body
  const employee = {
    id,
    name,
  }
  employees.push(employee)

  res.json({
    data: { employee },
  })
}

const getEmployee = async (req: Request, res: Response) => {
  const employeeId = Number(req.params.id)
  const employee = employees[employeeId]

  res.json({
    data: { employee },
  })
}

const listReviews = async (req: Request, res: Response) => {
  res.status(403).json({
    message: 'Forbidden',
  })
}


// router.post('/login', login)
// router.get('/me', showHomepage)

router.get('/employees', listEmployees)
router.post('/employees', createEmployee)
// router.put('/employees', updateEmployee)
// router.delete('/employees', deleteEmployee)
router.get('/employees/:id', getEmployee)

router.get('/reviews', listReviews)
// router.post('/reviews', createReview)
// router.put('/reviews', updateReview)
// router.get('/reviews/:reviewId', getReview)