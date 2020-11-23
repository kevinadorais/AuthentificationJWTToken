const router = require('express').Router() ;
const User = require('../models/user.model') ;
const bcrypt = require('bcrypt') ;
const jsonwebtoken = require('jsonwebtoken') ;
const JWT_SECRET = require('../config/jwt') ;
const moment = require('moment') ;

router.post('/', async (req, res) => {
    const body = req.body ;
    try {
        const user = await User.findOne({ email: body.email }, "-__v", {}).exec() ;
        if(!user) {
            return res.status(400).json(['Email does not exist !'])
        }
        const match = await bcrypt.compare(body.password, user.password) ;
        if(!match) {
            return res.status(400).json(['Password is not valid !'])
        }
        const jwtToken = jsonwebtoken.sign({
            sub: user._id.toString()
        }, JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '16min'
        })
        if(!jwtToken){
            throw 'Error while creating token' ;
        }
        res.status(200).json({
            user,
            jwtToken
        })
    } catch(e) {
        next(e) ;
    }
})

router.get('/refresh-token', async (req, res) => {
    const auth = req.headers.authorization ;
    if (auth) {
        const token = auth.split(' ')[1] ;
        const decodedToken = jsonwebtoken.verify(token, JWT_SECRET, { ignoreExpiration: true })
        if(moment(decodedToken.exp * 1000) > moment().subtract(7, 'd')){
            const user = await User.findById(decodedToken.sub, '-__v -password', {}).exec()
            const jwtToken = jsonwebtoken.sign({
                sub: user._id.toString()
            }, JWT_SECRET, {
                algorithm: 'HS256',
                expiresIn: '16min'
            })
            if(!jwtToken){
                throw 'Error while creating token' ;
            }
            res.status(200).json({
                user,
                jwtToken
            })
        }
        else {
            return res.status(403).json('token is old !')
        }
    }
    else{
        return res.status(403).json('token missing !')
    }
})

module.exports = router ;