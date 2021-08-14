require('dotenv').config()
const express = require('express')
const router = express.Router()
const DB = require('../Db/DbActions')

//PARSE
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// ENCRYPTION
var jwt = require('jsonwebtoken');

//Register User
router.post('/register', async (req,res,next) => {

    try {

        //Catch Request Data
        const {fName,lName, email, password} = req.body
        let user = {}
        user.fName = fName;
        user.lName = lName;
        user.email = email
        user.password = password

        //Check User Exist
        let dbResp = await DB.getUser(email)
        if(dbResp.status)
            res.send({status : false, message : 'User Already Exists', errorCode : 100})
        else {
            //Add user to Db
            console.log('Adding User...');
            const addResp = await DB.addUser(user)
            if(addResp.status){
                //return Token
                var token = jwt.sign({ id: addResp.userId }, process.env.TOKEN_SECRET);
                res.send({status : true, token : token})
            } else {
                res.send({status : false, message : 'failed to Add user', errorCode : 333})
            }

        }

    } finally {
    }

})

//Login
router.post('/login', async(req,res,next) => {

    const email = req.body.email
    const reqPassword = req.body.password

    //Check User Exists
    let dbResp = await DB.getUser(email)

    if(dbResp.status){

        userId = dbResp.item.userId
        password = dbResp.item.password

        if(reqPassword === password){
            var token = jwt.sign({ id: userId }, process.env.TOKEN_SECRET);
            res.send({status : true, token : token})
        } else 
            res.send({status : false, message: 'Invalid Password', errorCode : 100})
    } else {
        if(dbResp.errorCode === 303)
            res.send({status : false, message: 'No User found! Try register', errorCode : 303})
        else
            res.send({status : false, message: 'Fetch Error hee', errorCode : 300})
    }
    


})

module.exports = router