import React, {Component, PropsWithRef, SyntheticEvent} from 'react'
import Wrapper from './Wrapper'
import {User} from '../classes/user'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class UserEdit extends Component<{ match: PropsWithRef<any> }> {
    state = {
      username: '',
      password: '',
      role: '',
      redirect: false,
    }
    id = 0;
    username = '';
    password = '';
    role = '';

    componentDidMount = async () => {
      this.id = this.props.match.params.id
      const userCall = await axios.get(`http://localhost:3333/employees/${this.id}`)
      const user: User = userCall.data.employee

      this.setState({
        username: user.username,
        password: user.password,
        role: user.role,
      })
    }

    submit = async (e: SyntheticEvent) => {
      e.preventDefault()

      await axios.put(`http://localhost:3333/employees/${this.id}`, {
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
                defaultValue={this.username = this.state.username}
                onChange={e => this.username = e.target.value}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password"
                defaultValue={this.password = this.state.password}
                onChange={e => this.password = e.target.value}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" className="form-control" name="role" disabled
                defaultValue={this.role = this.state.role}
                onChange={e => this.role = e.target.value}
              />
            </div>

            <button className="btn btn-outline-secondary">Save</button>
          </form>
        </Wrapper>
      )
    }
}

export default UserEdit