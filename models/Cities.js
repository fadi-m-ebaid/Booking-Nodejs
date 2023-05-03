var mongoose = require("mongoose")
var citiesSchema = mongoose.Schema({
    CityName: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: false
    },
    CityImage: {
        type: String,
        required: false
    },
    CityImages: {
        type: [String],
        required: false
    },
    zipIpCode: {
        type: Number,
        required: false
    },
    hotelsCount:
     {type:Number}
})
var citiesModel = mongoose.model('Cities', citiesSchema)
module.exports = citiesModel