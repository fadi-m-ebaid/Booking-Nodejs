var mongoose = require("mongoose")
var activitiesSchema = mongoose.Schema({
    City: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'Cities',
        required: false
    },
    Name: {
        type: String,
        required: false
    },
    Title: {
        type: String,
        required: false
    },
    WhyVisit: {
        type: [String],
        required: false
    },
    Description: {
        type: String,
        required: false
    },
    Included: {},
    Restrictions: {
        type: String,
        required: false
    },
    TicketPrice: {
        type: Object,
        required: false,
        Adult: {
            type: Number,
            required: false
        },
        Child: {
            type: Number,
            required: false
        }
    },
    Images: {
        type: [String],
        require: false
    },
    MainImage: {
        type: [String],
        required: false
    },
    Address: {
        type: Object,
        required: false,
        Country: {
            type: String,
            required: false
        },
        City: {
            type: String,
            required: false
        },
        Street: {
            type: String,
            required: false
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