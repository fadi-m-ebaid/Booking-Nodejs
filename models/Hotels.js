const mongoose = require("mongoose")
const AddressSchema = new mongoose.Schema({
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
});
const FacilitiesSchema = new mongoose.Schema({
    MostPopularFacilities: {
        type: [String],
        required: true,
        default:  [
            "Free WiFiii",
            "Airport shuttle (free)",
            "Non-smoking rooms",
            "24-hour front desk",
            "Tea/Coffee Maker in All Rooms"
        ]
    },
    MoreFacilities: {
        type: Object,
        required: true,
        default: {
            "Food & Drink": [
                "Coffee house on site",
                "Breakfast in the room",
                "Minibar "
            ]
        }
    }
});
const HotelInfoSchema = new mongoose.Schema({
    HotelPhoneNum: {
        type: [Number],
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Fax: {
        type: String,
        required: true
    }
})


const hotelsSchema = mongoose.Schema({
    CityId: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'Cities'
    },
    name: {
        type: String,
        required: true,
    },
    // city:{
    //     type: String,
    //     required: false,
    // },
    // country: {
    //     type: String,
    //     required: false,
    // },
    location: {
        type: [Number],
        required: false
    },
    Address: {
        type: AddressSchema,
        required: false
    },
    Facilities: {
        type: FacilitiesSchema,
        required: false
    },
    SSRoomPrice: {
        type: Number,
        required: false
    },
    NofRooms: {
        type: Number,
        required: false
    },
    Availability: {
        type: Boolean,
        required: false
    },
    HotelDescription: {
        type: String,
        required: false
    },
    HotelImg: {
        type: String,
        required: false
    },
    HotelImages: {
        type: [String],
        required: false
    },
    HotelInfo: {
        type: HotelInfoSchema,
        required: false
    },

})
var hotelsModel = mongoose.model('Hotels', hotelsSchema)
module.exports = hotelsModel