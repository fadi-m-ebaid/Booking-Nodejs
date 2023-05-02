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
const toursSchema = mongoose.Schema({
    // Hotel: {
    //     type: mongoose.SchemaTypes.ObjectId, ref: 'Hotels',
    //     required: false
    // },
    City: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'Cities',
        required: false
    },
    Name: {
        type: String,
        required: false
    },
    Subtitle: {
        type: String,
        required: false
    },
    TourDescription: {
        type: String,
        required: false
    },
    TourImages: {
        type: [String]
    },
    TourImg: {
        type: String
    },
    Duration: {
        type: Number,
        required: false
    },
    TourAvailability: {
        type: Boolean,
        required: false
    },
    TicketPrice: {
        type: Number
        // type: TicketSchema
    }
})
var toursModel = mongoose.model('Tours', toursSchema)
module.exports = toursModel







