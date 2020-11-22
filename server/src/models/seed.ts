// import bcrypt from 'bcrypt'
// import { User } from './user'

// const password = process.env.LOGIN_PASSWORD

// export default async function seed(User: any){
//   await User.create({
//     username: 'admin',
//     password: await bcrypt.hash(password, 10),
//     role: 'admin',
//   })
//   await User.create({
//     name: 'emp1',
//     password: await bcrypt.hash(password, 10),
//     role: 'employee',
//   })
//   await User.create({
//     username: 'emp2',
//     password: await bcrypt.hash(password, 10),
//     role: 'employee',
//   })
// }