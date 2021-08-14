const mongoose = require('mongoose').set('debug', true);

const userSchema = mongoose.Schema({
    fName : {
        type : String,
        required : true
    },
    lName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('User',userSchema)