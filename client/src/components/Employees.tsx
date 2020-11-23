import React, {Component} from 'react'
import axios from 'axios'
import {User} from '../classes/user'
import {Link} from 'react-router-dom'
import Wrapper from './Wrapper'

class Users extends Component {
    state = {
      users: [],
    }

    componentDidMount = async () => {
      const response = await axios.get('http://localhost:3333/employees')

      this.setState({
        users: response.data.employees,
      })
    }


    render() {
      let addButton = null

      addButton = (
        <div
          className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link to={'/employees/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
          </div>
        </div>
      )

      return (
        <Wrapper>
          <h2>Employees</h2>
          {addButton}

          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(
                  (user: User) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                      </tr>
                    )
                  },
                )}
              </tbody>
            </table>
          </div>

        </Wrapper>
      )
    }
}

export default Users
