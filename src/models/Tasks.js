export default class Tasks {
  constructor (data) {
    this.id = Number(data.id)
    this.title = String(data.title)
    this.instruction = String(data.instruction)
    this.level = Number(data.level)
    this.user_id = Number(data.user_id)
    this.start_code = String(data.start_code)
    this.basic_tests = String(data.basic_tests)
    this.full_tests = String(data.full_tests)
    this.lastTask = Boolean(data.lastTask)
  }
}
