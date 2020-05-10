const express = require('express')
const checkAuth = require('../middleware/checkAuth')

let Task = require('../models/task_model')

const router = express.Router()

router.get('/', checkAuth, (req,res)=>{
    userid = req.userData.id
    Task.find({
        userid
    },
    (err, docs)=>{
        if(!err){
            res.status(200).json({
                msg: "Retrieval of tasks successful.",
                tasks: docs
            })
        }else{
            res.status(500).json({
                msg: "error in userid"
            })
        }
    })
})

router.post('/', checkAuth, (req, res)=>{
    const task = new Task({
        userid: req.userData.id,
        day: req.body.day,
        taskName: req.body.taskName,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    })
    task.save().then(result=>{
        res.status(200).json({
            msg: "Task Added.",
            task: result
        })
    })
})

module.exports = router