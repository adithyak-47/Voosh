// For adding new order: url/add-order (POST request)

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

router.post("/", auth, async(req, res) => {
    try
    {

        const {userid, subTotal, phoneNum} = req.body;

        if(userid !== user.id) return res.status(401).json({message: "Unauthorized!"});
       
       const newOrder = new Order({
        userid,
        subTotal,
        phoneNum
       });
    
       await newOrder.save();
       res.status(200).json({order:newOrder});
    }
    catch(err)
    {
        res.status(400).json({error: err});
    }

});

module.exports = router;