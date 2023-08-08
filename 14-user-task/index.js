import Task from "./task.js"
import User from "./user.js"

const task = new Task("my home-work");
const user = new User(task);

user.do()