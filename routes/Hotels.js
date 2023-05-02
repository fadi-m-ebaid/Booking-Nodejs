'use strict';
// const MultipleFile = require('../models/multiplefile.module');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyparser = require('body-parser');
const path = require('path');


const hotelsModel = require('../models/Hotels');
const citiesModel = require('../models/Cities');
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const dm = decimal || 2;
  const sizes = ['Bytes', 'KB', 'MB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index]
  );
};

var {
  createHotel,
  getHotel,
  deleteHotel,
  updateHotel,
  getHotelById,
  countByCity,
  searchByCity,
} = require('../controllers/Hotels');
router.post('/', async (req, res, next) => {
  try {
    var hotel = req.body;
    var Hotelsbycity = req.body.CityId;
    
    // Update the hotelsCount field in the cities collection
    await citiesModel.findOneAndUpdate(
      { _id: Hotelsbycity },
      { $inc: { hotelsCount: 1 } }
    );
    
    // Create the new hotel
    var savedHotel = await createHotel(hotel);
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});


router.get('/', async (req, res, next) => {
  //done

  try {
    var savedHotel = await getHotel();
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});
router.get('/:id', async (req, res, next) => {
  //done

  try {
    var { id } = req.params;
    var savedHotel = await getHotelById(id);
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  //done
  try {
    var { id } = req.params;

    var deleted = await deleteHotel(id);
    res.json(deleted);
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.patch('/:id', async (req, res) => {
  //update field by patch/done
  try {
    var { id } = req.params;
    var hotel = req.body;
    var updatedhotel = await updateHotel(id, hotel);
    res.json(updatedhotel);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.put('/availability/:id', async (req, res, next) => {
  try {
    await hotelsModel.updateOne(
      { 'hotelrooms.roomNumbers._id': req.params.id },
      { $push: { 'hotelrooms.$[room].roomNumbers.$[number].unavailableDates': req.body.dates } },
      { arrayFilters: [{ 'room.roomNumbers._id': req.params.id }, { 'number._id': req.params.id }] }
    );
    res.status(200).json('Room status has been updated.');
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

router.get('/searchcity/:city_id', async (req, res) => {
  try {
    var { city_id } = req.params;
    var getbycity = await searchByCity(city_id);
    res.json(getbycity);
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get('/getcity/:city_id', async (req, res) => {
  try {
    var { city_id } = req.params;
    var getbycity = await countByCity(city_id);
    res.json(getbycity);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get('/findHotels/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const findHotels = await searchByCity(city);
    res.json(findHotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.get("/:id",async(
//   req,res,next)=>{//done
//     var{id}=req.params
//     var city=req.body
//     try{
//       var savedHotel=await countByCity(id,city)
//       res.status(201).json(savedHotel)
//     }catch(err){
//       res.status(422).json({message:err.message})
//     }
//     })

// router.get('/countByCity', countByCity);

// export default router;
module.exports = router;
