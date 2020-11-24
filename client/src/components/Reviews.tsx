import React, {Component, PropsWithRef} from 'react'
import Wrapper from './Wrapper'
import axios from 'axios'
import {User} from '../classes/user'
import {Review} from '../classes/review'
import {Link, Redirect} from 'react-router-dom'

class Reviews extends Component<{ match: PropsWithRef<any> }> {
    state = {
      userId: 0,
      username: '',
      reviews: [],
    }

    componentDidMount = async () => {
      const userId = this.props.match.params.id
      const userCall = await axios.get(`http://localhost:3333/employees/${userId}`)
      const user: User = userCall.data.employee

      const reviews = [
        { id: 0, userId: this.state.userId, date: Date.now() },
        { id: 1, userId: this.state.userId, date: Date.now() },
        { id: 2, userId: this.state.userId, date: Date.now() },
      ]

      this.setState({
        userId: this.props.match.params.id,
        username: user.username,
        reviews: reviews,
      })
    }

    render() {
      const addButton = (
        <div
          className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link to={`/employees/${this.state.userId}/reviews/create`} className="btn btn-sm btn-success">+ New review</Link>
          </div>
        </div>
      )
      return (
        <Wrapper>
          <h4 className="text-uppercase pt-4">performance reviews for {this.state.username}</h4>

          {addButton}

          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.reviews.map(
                  (review: Review) => {
                    return (
                      <tr key={review.id}>
                        <td>{review.id}</td>
                        <td>{new Date(review.date).toLocaleString()}</td>
                        <td>
                          <div className="btn-group mr-2">
                            <Link to={`/employees/${this.state.userId}/reviews/${review.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                          </div>
                        </td>
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

export default Reviews