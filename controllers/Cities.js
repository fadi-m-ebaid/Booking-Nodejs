const fs=require('fs');
var express=require('express') 
// const hotelsModel=require('../models/Hotels')
const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })
const citiesModel=require('../models/Cities')

function createCity(city){
return  citiesModel.create(city)
}
   
function getCity(id)
{
    return citiesModel.find(id);
}

   
function deleteCity(id)
{
    return citiesModel.findByIdAndDelete(id);
}
  
function updateCity(id,city)
{
    var updatedcity = citiesModel.findByIdAndUpdate(id,city,{new:true});
    return updatedcity
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

// function searchByCity(city_id)
// {
//     return citiesModel.find({city_id})
// }

// function countByCity(city_id)
// {
//     return citiesModel.countDocuments({city_id})
// }

module.exports={createCity,getCity,deleteCity,updateCity} 
