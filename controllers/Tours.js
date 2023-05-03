const fs=require('fs');
var express=require('express') 
const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })
const toursModel=require('../models/Tours')

function createTour(tour){
return  toursModel.create(tour);
}
// getTourById ???????
function getTourById(id)
{
    return toursModel.findById(id).populate("City");
}

function getTour()
{
    return toursModel.find().populate("City");
}

function deleteTour(id)
{
    return toursModel.findByIdAndDelete(id).populate("City");
}

function updateTour(id,tour)
{
    var updatedtour = toursModel.findByIdAndUpdate(id,tour,{new:true});
    return updatedtour
}

module.exports={createTour,deleteTour,updateTour,getTour,getTourById} 
