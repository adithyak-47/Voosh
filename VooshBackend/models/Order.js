// We will need the user_id, sub_total, phone_number to add any order

const mongoose = require('mongoose');

const Order = mongoose.model(
    "Orders",
    new mongoose.Schema(
        {
            userid: {type: mongoose.Schema.Types.ObjectId, required:true, ref: 'Users'},
            subTotal: {type: Number, require: true},
            phoneNum: {type: String, required:true}
        },
        {
            timestamps:true
        }
    )
);

module.exports = Order;