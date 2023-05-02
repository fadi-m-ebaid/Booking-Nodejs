// var mongoose = require("mongoose")
// var bookingProcessSchema = mongoose.Schema({
//     Id: {
//         type: mongoose.SchemaTypes.ObjectId, ref: ''
//     },
//     BookingType: {
//         type: String,
//         required: true
//     },
//     RoomId: {
//         type: String,
//         required: true
//     },
//     TourId: {
//         type: String,
//         required: true
//     },
//     BookingDate: {
//         type: Date,
//         default: Date.now,
//         required: true
//     },
//     ArrivalDate: {
//         type: Date,
//         required: true
//     },
//     DepartureDate: {
//         type: Date,
//         required: true
//     },
//     Discount: {
//         type: Number
//     },
//     NumberOfMembers: {
//         type: Number
//     }
// })
// var bookingProcessModel = mongoose.model('BookingProcess', bookingProcessSchema)
// module.exports = bookingProcessModel

hotelsModel = require("./Hotels")

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    hotelData: { type: mongoose.SchemaTypes.ObjectId, ref: "Hotels" },
    //hotelName: { type: String, required: true },
    // checkInDate: { type: Date, required: true },
    // checkOutDate: { type: Date, required: true },
    totalCost: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    //customerMobile: { type: Number, required: true },
    paymentStatus: { type: String, default: 'pending' },
    paymentId: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);