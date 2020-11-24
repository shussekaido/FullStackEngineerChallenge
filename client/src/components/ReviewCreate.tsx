import React, {Component, PropsWithRef, SyntheticEvent} from 'react'
import {User} from '../classes/user'
import Wrapper from './Wrapper'
import Checkbox from './Checkbox'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class ReviewCreate extends Component<{ match: PropsWithRef<any> }> {
    state = {
      userId: 0,
      username: '',
      review: '',
      assigned: [],
      date: '',
      allUsers: [],
      redirect: false,
    }
    review = ''

    handleCheckChildElement = (event: any) => {
      /** TODO: Assign checked users to reviews */
    }

    componentDidMount = async () => {
      const userCall = await axios.get(`http://localhost:3333/employees/${this.props.match.params.id}`)
      const user: User = userCall.data.employee
      const allUsers = await axios.get('http://localhost:3333/employees')

      this.setState({
        userId: this.props.match.params.id,
        username: user.username,
        date: new Date().toLocaleString(),
        allUsers: allUsers.data.employees,
      })
    }

    submit = async (e: SyntheticEvent) => {
      e.preventDefault()

      const res = await axios.post('http://localhost:3333/reviews', {
        userId: Number(this.state.userId),
        username: this.state.username,
        review: this.review,
        assigned: this.state.assigned,
        date: this.state.date,
      })

      this.setState({
        redirect: true,
      })
    }

    render() {
      if (this.state.redirect) {
        return <Redirect to={`/employees/${this.state.userId}/reviews`}/>
      }

      return (
        <Wrapper>
          <h4 className="text-uppercase pt-4 mb-4">Write a performance review for {this.state.username}</h4>

          <form onSubmit={this.submit}>
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <label>Write a review</label>
                  <textarea className="form-control rounded-0" id="review" name="review"
                    onChange={e => this.review = e.target.value}
                  />
                </div>

                <div className="col ml-5">
                  <label>Select users for feedback:</label>

                  {
                    this.state.allUsers.map((user: User, index) => {
                      return (
                        <div className="form-check">
                          <Checkbox key={index} handleCheckChildElement={this.handleCheckChildElement}  {...user} />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <p>{this.state.date}</p>
            <button className="btn btn-outline-secondary">Save</button>
          </form>
        </Wrapper>
      )
    }
}

export default ReviewCreate