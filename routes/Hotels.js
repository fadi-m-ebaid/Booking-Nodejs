const express = require('express');
const router = express.Router();

const hotelsModel = require('../models/Hotels');
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
  //done
  var hotel = req.body;
  try {
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
