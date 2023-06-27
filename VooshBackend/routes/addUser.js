// For new user: url/add-user (POST request)


const Express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const rounds = parseInt(process.env.SALT_ROUNDS);
const router = Express.Router();

const salt = bcrypt.genSaltSync(rounds);

router.post("/", async(req, res) => {
    try{
        const {name, email, phoneNum, password} = req.body;
        const UserDoc = await User.create({
            name,
            email,
            phoneNum,
            password: bcrypt.hashSync(password, salt)
        });

        res.status(200).json(UserDoc)
    }
    catch(err){
        res.status(400).json({error: err});
    }
});

module.exports = router;