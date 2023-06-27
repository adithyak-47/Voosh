// We will store the name, phone number, and a new password (hashed password)
//Added the email parameter for better and easier authentication.

const mongoose = require('mongoose');

const User = mongoose.model(
    "Users", 
    new mongoose.Schema(
        {
            name: {type: String, minlength: 10, required:true},
            email: {type:String, required: true},
            phoneNum: {type: String, minlength: 10, required:true},
            password: {type: String, minlength: 8, required: true}
        }
    )
);

module.exports = User;