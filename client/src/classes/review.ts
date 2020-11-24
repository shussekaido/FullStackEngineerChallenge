export class Review {
    id: number;
    userId: number;
    date: Date;

    constructor(id = 0, userId = 0, date = '') {
      this.id = id
      this.userId = userId
      this.date = new Date(date)
    }
}