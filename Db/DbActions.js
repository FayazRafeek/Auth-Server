const Connection = require('./connection')
const User = require('../Models/User');

async function getUser(email) {

    let userModel = null;
    await Connection();
    await User.findOne({email : email}, (err,user) => {
        if(err)
            return
        if(user)
            userModel = user
    })

    return userModel

}

module.exports.getUser = getUser