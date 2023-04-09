const mongoose = require("mongoose")
const PaymentMethodSchema = mongoose.Schema({
    PayType: {
        type: String,
        required: true
    },
    PayDate: {
        type: Date,
        default: Date.now,
    },
    PayDescription: {
        type: String,
    },
    PayAmount: {
        type: Number,
        required: true
    }

})



var paymentMethodModel = mongoose.model('PaymentMethod', PaymentMethodSchema)
module.exports = paymentMethodModel