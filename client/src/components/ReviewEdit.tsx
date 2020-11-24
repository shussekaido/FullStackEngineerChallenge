import React, {Component, PropsWithRef, SyntheticEvent} from 'react'
import Wrapper from './Wrapper'
import {User} from '../classes/user'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { userInfo } from 'os'

class ReviewEdit extends Component<{ match: PropsWithRef<any> }> {
    state = {
      userId: 0,
      reviewId: '',
      username: '',
      review: '',
      assigned: [],
      date: '',
      allUsers: [],
      reviewUserId: 0,
      redirect: false,
    }

    review = ''
    feedback = ''

    componentDidMount = async () => {
      const userCall = await axios.get(`http://localhost:3333/employees/${this.props.match.params.id}`)
      const user: User = userCall.data.employee
      const reviewCall = await axios.get(`http://localhost:3333/reviews/${this.props.match.params.reviewId}`)
      const allUsers = await axios.get('http://localhost:3333/employees')

      this.setState({
        userId: this.props.match.params.id,
        reviewId: this.props.match.params.reviewId,
        username: user.username,
        review: reviewCall.data[0].review,
        assigned: reviewCall.data.assigned,
        date: new Date().toLocaleString(),
        allUsers: allUsers.data.employees,
      })
    }

    submit = async (e: SyntheticEvent) => {
      e.preventDefault()

      await axios.put(`http://localhost:3333/reviews/${this.state.reviewId}`, {
        userId: Number(this.state.userId),
        username: this.state.username,
        review: this.state.review,
        feedback: this.feedback,
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
          <h4 className="text-uppercase pt-4">Add feedback to review of {this.state.username}</h4>
          <form onSubmit={this.submit}>
            <div className="form-group">
              <label>Review</label>
              <textarea className="form-control rounded-0" id="review" name="review"
                defaultValue={this.state.review}
                onChange={e => this.setState({ review: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Add new feedback as user:</label>
              <select className="form-control" name="user_id"
                onChange={e => this.setState({ feedbackUserId: parseInt(e.target.value) })}
              >
                {this.state.allUsers.map(
                  (user: User) => {
                    return ( <option key={user.id} value={user.id}>{ user.username }</option> )
                  },
                )}
              </select>
            </div>
            <div className="form-group">
              <label>Add new feedback message</label>
              <textarea className="form-control rounded-0" id="feedback" name="feedback"
                onChange={e => this.feedback = e.target.value}
              />
            </div>


            <button className="btn btn-outline-secondary">Save</button>
          </form>
        </Wrapper>
      )
    }
}

export default ReviewEdit