import React, {Component, SyntheticEvent} from 'react'
import './style.css'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Login extends Component {
    username = '';
    password = '';
    state = {
      redirect: false,
    }

    submit = async (e: SyntheticEvent) => {
      e.preventDefault()

      const response = await axios.post('http://localhost:3333/login', {
        username: this.username,
        password: this.password,
      })

      localStorage.setItem('token', response.data.token)
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

      this.setState({
        redirect: true,
      })
    }

    render() {
      if (this.state.redirect) {
        return <Redirect to={'/me'}/>
      }

      return (
        <form className="form-signin" onSubmit={this.submit}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input type="text" id="inputUsername" className="form-control" placeholder="admin" required
            onChange={e => this.username = e.target.value}
          />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="123"
            onChange={e => this.password = e.target.value}
            required/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      )
    }
}

export default Login