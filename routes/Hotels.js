'use strict';
const MultipleFile = require('../models/multiplefile.module');

const express = require('express');
const router = express.Router();

const hotelsModel = require('../models/Hotels');

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

// router.post('/', async (req, res, next) => {
//   //done
//   var hotel = req.body;
//   try {
//     var savedHotel = await createHotel(hotel);
//     res.status(201).json(savedHotel);
//   } catch (err) {
//     res.status(422).json({ message: err.message });
//   }
// });

//CREATE PRODUCTOR
exports.createHotel = (req, res) => {
  console.log(req.files);
  const filesPath = [];
  const filesArray = [];
  req.files.forEach((element) => {
    const file = {
      fileName: element.originalname,
      filePath: element.path,
      fileType: element.mimetype,
      fileSize: fileSizeFormatter(element.size, 2), //size be the half
    };
    filesArray.push(file);
    filesPath.push(element.path);
  });
  const multipleFiles = new MultipleFile({
    files: filesArray,
  });
  multipleFiles.save();
  const totalprice =
    req.body.SSRoomPrice - (req.body.SSRoomPrice * req.body.discount) / 100;
  const hotelAlreadyExists = hotelsModel.findOne({ name: req.name });
  if (hotelAlreadyExists.name) {
    res.status(404).send({ message: 'Hotel already exists' });
  } else {
    console.log(req.body);
    const newHotel = new Hotels({
      name: req.body.name,
      // arname: req.body.arname,//
      // sellerId: req.user.id,
      RoomID: req.RoomID,
      imagePath: filesPath, //
      location: req.body.location,
      Address: req.body.Address,
      Facilities: req.body.Facilities,
      Availability: req.body.Availability,
      // arcategory: req.body.arcategory,//
      HotelDescription: req.body.HotelDescription,
      // arsubcategory: req.body.arsubcategory,//
      NofRooms: req.body.NofRooms,
      // ardescription: req.body.description,//
      HotelInfo: req.body.HotelInfo,
      SSRoomPrice: req.body.SSRoomPrice,
    });
    //////////////////
    console.log(newHotel, 'yyyyy');
    newHotel
      .save()
      .then((savedHotel) => {
        console.log(savedHotel);
        res.status(200).send(savedHotel);
      })
      .catch((err) => {
        res.status(401).send({ message: 'something wrong' });
      });
  }
};

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
