const express = require('express');
const router = express.Router();

// const hotelsModel=require('../models/Hotels')
const citiesModel=require('../models/Cities')
// var {createHotel,getHotel,deleteHotel,updateHotel,countByCity,searchByCity}=require('../controllers/Hotels')
var {createCity,getCity,deleteCity,updateCity}=require('../controllers/Cities')




    router.post("/",async(
      req,res,next)=>{//done
        var city=req.body
        try{
          var savedCity=await createCity(city)
          res.status(201).json(savedCity)
        }catch(err){
          res.status(422).json({message:err.message}) 
        }
        })



        router.get("/",async(
          req,res,next)=>{//done

            try{
              var savedCity=await getCity()
              res.status(201).json(savedCity)
            }catch(err){
              res.status(422).json({message:err.message}) 
            }
            })

          
 router.delete("/:id",async(req,res)=>{   //done
  try{
  var{id}=req.params
  
  var deleted=await deleteCity(id) 
  res.json(deleted)
  } catch(err){
   res.json({message:err.message});
  } 
})
router.patch("/:id",async(req,res)=>{      //update field by patch/done
  try{
     var{id}=req.params
     var city=req.body
    var updatedcity= await updateCity(id,city) 
     res.json(updatedcity)
   }catch(err){
   res.json({message:err.message})
   }
  })
   router.get("/searchcity/:city_id",async(req,res)=>{
  try{
   var {city_id}=req.params
   var getbycity = await searchByCity(city_id)
   res.json(getbycity)
  }
  catch(err){
    res.json({message:err.message})
  }
   })

//    router.get("/getcity/:city_id",async(req,res)=>{
//     try{
//      var {city_id}=req.params
//      var getbycity = await countByCity(city_id)
//      res.json(getbycity)
//     }
//     catch(err){
//       res.json({message:err.message})
//     }
//      })

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
module.exports=router