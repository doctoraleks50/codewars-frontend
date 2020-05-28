export default class User {
  constructor (data) {
    this.id = Number(data.id)
    this.firstName = String(data.firstName)
    this.lastName = String(data.lastName)
    this.level = String(data.level)
    this.points = String(data.points)
    this.googleId = Number(data.googleId)
    this.solutionsId = data.solutionsId
  }
}
