require('dotenv').config()
const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user_model')

//Schema for a user

router = express.Router();
router.post('/signup', (req, res)=>{
    User.findOne({username: req.body.username}, (err, doc)=>{
        if(!err){
            if(doc==null){
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    if (!err){
                        const user = new User({
                            username: req.body.username,
                            password: hash
                        });
                        user.save().then(result=>{
                            res.status(201).json({
                                msg: "User Created",
                                user: {
                                    id: result._id,
                                    username: result.username,
                                }
                            })
                        }).catch(error=>{
                            console.log(error)
                            res.status(500).json({
                                msg: "Internal Server Error. Unable to save user to database."
                            })
                        })
                    }else{
                        res.status(500).json({
                            msg: "Internal Server Error. Unable to generate hash."
                        });
                    }
                })
            }else{
                res.status(400).json({
                    msg: "Username already taken. Try another one.",
                })
            }
        }else{
            res.status(500).json({
                msg: "Internal Server Error.",
            })
        }
    })
})

router.get('/login', (req, res)=>{
    User.findOne({username: req.body.username}, (err, doc)=>{
        if(err){
            res.status(400).json({
                msg: "Authentication failed. Check your username and password."
            })
        }else{
            bcrypt.compare(req.body.password, doc.password)
            .then(result=>{
                if (result){
                    jwt.sign(
                        {
                            id: doc._id,
                            username: doc.username,
                        },
                        process.env.JWT_PRIVATE_KEY,
                        (err, token)=>{
                            if(!err){
                                res.status(200).json({
                                    msg: "Authentication Successful.",
                                    token
                                })
                            }else{
                                console.log(err)
                                res.status(500).json({
                                    msg: "Internal Server Error. Error generating token."
                                })
                            }
                        }
                    )
                }else{
                    res.status(400).json({
                        msg: "Authentication failed. Check your username and password."
                    })
                }
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    msg: "Internal Server Error. Error comparing hash.",
                })
            })
        }
    })
})

module.exports = router;