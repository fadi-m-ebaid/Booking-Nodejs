const fs=require('fs');
var express=require('express') 
const roomsModel=require('../models/Rooms')
const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })


function createroom(room){
return  roomsModel.create(room)
}
   
function getroom(id)
{
    return roomsModel.find(id);
}

   
function deleteroom(id)
{
    return roomsModel.findByIdAndDelete(id);
}
  
function updateroom(id,room)
{
    return roomsModel.findByIdAndUpdate(id,room);
}

module.exports={createroom,getroom,deleteroom,updateroom
    // updateRoomAvailability
}
