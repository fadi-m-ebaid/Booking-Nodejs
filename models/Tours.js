const mongoose = require("mongoose")
const TicketSchema = mongoose.Schema({
    type: Number,
    Adult: {
        type: Number
    },
    Child: {
        type: Number
    }
})
const ToursSchema = mongoose.Schema({
    Hotel: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'Hotels',
        required: true
    },
    City: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'Cities',
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Subtitle: {
        type: String,
        required: true
    },
    TourDescription: {
        type: String,
        required: true
    },
    TourImages: {
        type: [String]
    },
    TourImg: {
        type: String
    },
    Duration: {
        type: Number,
        required: true
    },
    TourAvailability: {
        type: Boolean,
        required: true
    },
    TicketPrice: {
        type: TicketSchema
    }
})
var ToursModel = mongoose.model('Tours', ToursSchema)
module.exports = ToursModel