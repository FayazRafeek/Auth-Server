require('dotenv').config()
const express = require('express')
const router = express.Router()
const { getUser } = require('../Db/DbActions')

//PARSE
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// ENCRYPTION
var jwt = require('jsonwebtoken');
const User = require('../Models/User');



//Register User
router.post('/register', async (req,res,next) => {

    try {

        const {fName,lName, email, password} = req.body

        let user = {}
        user.fName = fName;
        user.lName = lName;
        user.email = email
        user.password = password

        let userExist = await getUser(email)

        console.log(userExist);

        if(userExist && userExist.email !== null)
            res.send({status : false, message : 'User Already Exists', errorCode : 100})
        else {

            let userModel = new User(user)
            const id = userModel.save()
            var token = jwt.sign({ id: id }, process.env.TOKEN_SECRET);

            res.send({status : true, token : token})
        }

    } finally {
    }

})

//Login
router.post('/login', async(req,res,next) => {

    const email = req.body.email
    const reqPassword = req.body.password

    //Check User Exists
    let userFetched = await getUser(email)

    if(userFetched && userFetched.email != null){

        const {id, password} = userFetched
        if(reqPassword === password){
            //Return Token
            var token = jwt.sign({ id: id }, process.env.TOKEN_SECRET);
            res.send({status: true, token : token})
        }
        else{
            res.send({status : false, message : 'Incorrect Password', errorCode : 102})
        }
    } else {
        res.send({status : false, message : 'No User Found', errorCode : 101})
    }


})

module.exports = router