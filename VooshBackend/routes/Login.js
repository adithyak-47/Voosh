// For Login user: url/login-user (POST request)
// phone number, password, login_by
// - Login_by will be a parameter which will be used to define between Google &
// normal Login

const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const firebaseAdmin = require('firebase-admin');
const firebaseConfig = require('../firebaseConfig');

//Initializing firebase admin.
firebaseAdmin.initializeApp({
    credential:firebaseAdmin.credential.cert(firebaseConfig)
});

router.post("/", async(req, res) => {
    const {login_by} = req.body;
    

    if(login_by === 'google')
    {
        try
        {
            
            const {idToken} = req.body;
            //Verify the user google ID token using Firebase.
            const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
            const userEmail = decoded.email;
            const userGoogle = await User.findOne({userEmail});
            if(!userGoogle)
            {
                return res.status(401).json('Invalid credentials.');
            }
    
            jwt.sign({name: userGoogle.name, id: userGoogle._id}, secretKey, {}, (err, token) => {
                if(err) throw err;
                res.setHeader('Authorization', `Bearer ${token}`);
                res.status(200).json({
                    name: userGoogle.name,
                    id: userGoogle._id
                })
            })
        }
        catch(err)
        {
            res.status(400).json(err);
        }
    }
    else
    {
        try
        {
            const {phoneNum, password} = req.body;
            const user = await User.findOne({phoneNum});
            const passOk = bcrypt.compareSync(password, user.password);
            if(passOk)
            {
                jwt.sign({name: user.name, id: user._id}, secretKey, {}, (err, token) => {
                    if(err) throw err;
                    res.setHeader('Authorization', `Bearer ${token}`)
                    // res.status(200).json({
                    //     name: user.name,
                    //     id: user._id
                    // });
                    res.status(200).json({token: token, name: user.name, id: user._id});
                });   
            }
            else
            {
                res.status(401).send('Invalid credentials.');
            }

        }
        catch(err){
            res.status(400).json(err);
        }
    }
})


module.exports = router;