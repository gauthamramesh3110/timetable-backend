require('dotenv')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        token = req.headers.authorization.split(" ")[1]
        decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        req.userData = decoded;
        next()
    }catch(err){
        res.status(400).json({
            msg: "Cannot Authenticate Token."
        })
        console.log(err)
    }
}