const mongoose = require('mongoose');
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
const HotelRoomsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

var roomsModel = mongoose.model('Rooms', HotelRoomsSchema);
module.exports = roomsModel;
