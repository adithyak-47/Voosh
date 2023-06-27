const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

router.get('/', auth, async(req, res) => {

    try
    {
        const {userid} = req.query;
        if(userid !== req.user.id) return res.status(401).json({message: 'You are not the same user!'});

        const orders = await Order.find({userid});
        res.status(200).json({message: orders});
    }
    catch(err)
    {
        res.status(400).json({error: err});
    }
});

module.exports = router;