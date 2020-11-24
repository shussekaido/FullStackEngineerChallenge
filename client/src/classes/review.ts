export class Review {
    _id: string;
    userId: number;
    date: Date;

    constructor(_id = '', userId = 0, date = '') {
      this._id = _id
      this.userId = userId
      this.date = new Date(date)
    }
}