const fs = require('fs');
var express = require('express');
const hotelsModel = require('../models/Hotels');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const citiesModel = require('../models/Cities');

function createHotel(hotel) {
    return hotelsModel.create(hotel)
}

function getHotel() {
    return hotelsModel.find().populate("hotelrooms");
}
function getHotelById(id) {
    return hotelsModel.findById(id).populate("hotelrooms");
}


function deleteHotel(id) {
    return hotelsModel.findByIdAndDelete(id).populate("hotelrooms");
}

function updateHotel(id, hotel) {
    return hotelsModel.findByIdAndUpdate(id, hotel).populate("hotelrooms");
}
// function countByCity async (req, res, next)
// {
//     const city
//     try
//     { await
//     }
//     return hotelsModel.findByIdAndUpdate(id,hotel);
// }
// async function countByCity(req, res) {
//     var { CityName } = req.body;
//     // var { CityName } = "Paris";
//     var cities = await citiesModel.find({CityName});

//     if (cities) {
//         const list = cities.map(city=>{
//        return Hotel.countDocuments({CityN:city.CityName})
//     })
//     res.status(200).json(list);
//     console.log(list);
//     }
//     else {
//         res.status(401).end('error');
//     }
// }

function searchByCity(city) {

    return hotelsModel.find({ 'Address.City': city });
}

function countByCity(city_id) {
    return hotelsModel.countDocuments(city_id).populate("CityId")
}

module.exports = {
    createHotel,
    getHotel,
    getHotelById,
    deleteHotel,
    updateHotel,
    countByCity,
    searchByCity,
    hotelsModel,
};
