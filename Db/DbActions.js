const Connection = require('./connection')
const User = require('../Models/User');

async function getUser(email) {

    let userModel = null;
    await Connection();
    await User.find({email : email}, (err,users) => {
        console.log(users);
        if(err)
            return
        if(users.length == 0)
            userModel = null
        else
            userModel = users[0]

    })

    return userModel

}

module.exports.getUser = getUser