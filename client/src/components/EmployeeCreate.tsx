import React, {Component, SyntheticEvent} from 'react'
import Wrapper from './Wrapper'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class EmployeeCreate extends Component {
    state = {
      roles: [],
      redirect: false,
    }
    username = '';
    password = '';
    role = '';

    submit = async (e: SyntheticEvent) => {
      e.preventDefault()

      await axios.post('http://localhost:3333/employees', {
        username: this.username,
        password: this.password,
        role: this.role,
      })

      this.setState({
        redirect: true,
      })
    }

    render() {
      if (this.state.redirect) {
        return <Redirect to={'/'}/>
      }

      return (
        <Wrapper>
          <form onSubmit={this.submit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" name="username"
                onChange={e => this.username = e.target.value}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password"
                onChange={e => this.password = e.target.value}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" className="form-control" name="role" value="employee" disabled
                onChange={e => this.role = e.target.value}
              />
            </div>

            <button className="btn btn-outline-secondary">Save</button>
          </form>
        </Wrapper>
      )
    }
}

export default EmployeeCreate