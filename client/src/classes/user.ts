import {Role} from './role'

export class User {
    id: number;
    username: string;
    password: string;
    role: Role;

    constructor(id = 0, username = '', password = '', role = new Role()) {
      this.id = id
      this.username = username
      this.password = password
      this.role = role
    }
}