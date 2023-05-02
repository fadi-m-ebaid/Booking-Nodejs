const fs=require('fs');
var express=require('express') 
// const hotelsModel=require('../models/Hotels')
const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })
const activitiesModel = require ('../models/Activities')


function createActivity(Activity){
return  activitiesModel.create(Activity);
}
   
function getActivityById(id)
{
    return activitiesModel.findById(id);
}

function getActivity() {
    return activitiesModel.find().populate('City');
  }
function deleteActivity(id)
{
    return activitiesModel.findByIdAndDelete(id).populate('City');
}
  
function updateActivity(id,activity)
{
    var updatedactivity = activitiesModel.findByIdAndUpdate(id,activity,{new:true}).populate('City');
    return updatedactivity
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

module.exports={createActivity,getActivityById,getActivity,deleteActivity,updateActivity} 
