const mongoose = require('mongoose');
const Booking = require ('./Booking')

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  //paymentMethod: { type: String, required: true },
  amount: { type: Number, required: true },
  //status: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);