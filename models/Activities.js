var mongoose = require("mongoose")
var activitiesSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    WhyVisit: {
        type: [String],
        required: false
    },
    Description: {
        type: String,
        required: true
    },
    Included: {},
    Restrictions: {
        type: String,
        required: true
    },
    TicketPrice: {
        type: Object,
        required: true,
        Adult: {
            type: Number,
            required: true
        },
        Child: {
            type: Number,
            required: false
        }
    },
    Images: {
        type: [String],
        require: true
    },
    MainImage: {
        type: [String],
        required: true
    },
    Address: {
        type: Object,
        required: true,
        Country: {
            type: String,
            required: true
        },
        City: {
            type: String,
            required: true
        },
        Street: {
            type: String,
            required: true
        }
    },
    Duration: {
        type: Date,
        default: Date.now
    },
    Availability: {
        type: Boolean
    },
    Excluded: {
        type: [String]
    },
    Languages: {
        type: [String]
    },
    Location: {
        type: [String]
    }
})
var activitiesModel = mongoose.model('Activitie', activitiesSchema)
module.exports = activitiesModel