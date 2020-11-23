import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {User} from '../classes/user'
import axios from 'axios'

class Nav extends Component {
    state = {
      redirect: false,
    }

    handleClick = async () => {
      await axios.post('logout', {})

      this.setState({
        redirect: true,
      })
    }

    render() {
      if (this.state.redirect) {
        return <Redirect to={'http://localhost:3333/login'}/>
      }

      return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Review App</a>

          <ul className="my-2 my-md-0 mr-md-3">
            <Link to={'/profile'}
              className="p-2 text-white">admin</Link>
            <a className="p-2 text-white" href="#" onClick={this.handleClick}>Sign out</a>
          </ul>
        </nav>
      )
    }
}

export default Nav
