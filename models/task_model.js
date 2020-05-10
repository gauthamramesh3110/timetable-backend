const mongoose = require('mongoose')

let taskSchema = mongoose.Schema({
    userid: mongoose.Schema.Types.ObjectId,
    day: String,
    taskName: String,
    startTime: String,
    endTime: String
})

module.exports = mongoose.model('task', taskSchema)