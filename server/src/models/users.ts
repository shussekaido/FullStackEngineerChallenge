import { User } from './db'

export async function findByUsername(username: string): Promise<any> {
  return await User.findOne({ where: { username: username } })
}

export async function findById(id: number): Promise<any> {
  return await User.findOne({ where: { id: id }, raw: true })
}

export async function findAllUsers(): Promise<any> {
  /** Returns users excluding passwords */
  return await User.findAll({ where: { role: 'employee' }, attributes: { exclude: ['password'] }, raw: true })
}

export async function createEmployee(employee): Promise<any> {
  return await User.create(employee)
}

export async function updateEmployee(employee): Promise<any> {
  return await User.update(employee, { where: { id: employee.id }, returning: true })
}

export async function deleteEmployee(employeeId): Promise<any> {
  return await User.destroy({ where: { id: employeeId }})
}