import React, {Component, Dispatch, PropsWithChildren} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {User} from '../classes/user'
import Nav from './Nav'

class Wrapper extends Component<PropsWithChildren<any>> {
    state = {
      redirect: false,
    }
    componentDidMount = async () => {
      try {
        // const response = await axios.get('user')

        // const user: User = response.data.data

        // this.props.setUser(new User(
        //   user.id,
        //   user.username,
        // ))
      } catch (e) {
        this.setState({
          redirect: true,
        })
      }
    }

    render() {
      if (this.state.redirect) {
        return <Redirect to={'/login'}/>
      }

      return (
        <>
          <Nav/>

          <div className="container-fluid">
            <div className="row">
              <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                {this.props.children}
              </main>
            </div>
          </div>
        </>
      )
    }
}

export default Wrapper