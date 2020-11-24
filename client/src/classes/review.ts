export class Review {
    _id: string
    userId: number
    review: string
    feedback: string
    assigned: Array<number>
    date: Date

    constructor(_id = '', userId = 0, review = '', feedback = '', assigned = [], date = '') {
      this._id = _id
      this.userId = userId
      this.review = review
      this.feedback = feedback
      this.assigned = assigned
      this.date = new Date(date)
    }
}