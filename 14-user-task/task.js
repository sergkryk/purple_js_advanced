export default class Task {
  constructor(message) {
    this.message = message;
  }

  run() {
    console.log(`I'm doing ${this.message}`);
  }
}