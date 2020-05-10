const mongoose = require('mongoose')

let taskSchema = mongoose.Schema({
    day: String,
    taskName: String,
    startTime: String,
    endTime: String
})

module.exports = mongoose.model('task', taskSchema)