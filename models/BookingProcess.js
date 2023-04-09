var mongoose = require("mongoose")
var bookingProcessSchema = mongoose.Schema({
    Id: {
        type: mongoose.SchemaTypes.ObjectId, ref: ''
    },
    BookingType: {
        type: String,
        required: true
    },
    RoomId: {
        type: String,
        required: true
    },
    TourId: {
        type: String,
        required: true
    },
    BookingDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    ArrivalDate: {
        type: Date,
        required: true
    },
    DepartureDate: {
        type: Date,
        required: true
    },
    Discount: {
        type: Number
    },
    NumberOfMembers: {
        type: Number
    }
})
var bookingProcessModel = mongoose.model('BookingProcess', bookingProcessSchema)
module.exports = bookingProcessModel