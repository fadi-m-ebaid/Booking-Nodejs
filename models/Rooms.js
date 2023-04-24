const mongoose = require("mongoose")
// const RoomSchema = new mongoose.Schema({
//     roomCount: Number,
//     bedType: String,
//     roomImages: [String],
//     roomImg: String,
//     roomFacilities: String,
//     toiletsNumber: Number,
//     roomPrice: Number,
// })
// const TypeOfRoomsSchema = new mongoose.Schema({
//     Single: {
//         type: RoomSchema
//     },
//     Double: {
//         type: RoomSchema
//     },
//     Triple: {
//         type: RoomSchema
//     },
//     Quadruple: {
//         type: RoomSchema
//     }
// })
const HotelRoomsSchema = new mongoose.Schema({
    RoomType: String,
    BedType: String,
    RoomFacilities: Object,
    ToiletsNumber: Number,
    RoomSize: String,
   })

var roomsModel = mongoose.model('Rooms', HotelRoomsSchema)
module.exports = roomsModel



