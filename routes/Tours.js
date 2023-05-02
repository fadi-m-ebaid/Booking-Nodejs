const express = require('express');
const router = express.Router();

const toursModel=require('../models/Tours')
var {createTour,deleteTour,updateTour,getTour,getTourById} = require('../controllers/Tours')



router.post("/",async(
    req,res,next)=>{//done
    var tour=req.body
    try{
        var savedTour=await createTour(tour)
        res.status(201).json(savedTour)
    }catch(err){
        res.status(422).json({message:err.message}) 
    }
    })
 // ById ??????????????
    router.get("/:id",async(
        req,res,next)=>{//done
        try{
            var{id}=req.params
            var savedTour=await getTourById(id)
            res.status(201).json(savedTour)
        }catch(err){
            res.status(422).json({message:err.message}) 
        }
        })

    router.get("/",async(
        req,res,next)=>{//done
        try{
            var savedTour=await getTour()
            res.status(201).json(savedTour)
        }catch(err){
            res.status(422).json({message:err.message}) 
        }
        })

        
router.delete("/:id",async(req,res)=>{   //done
try{
var{id}=req.params

var deleted=await deleteTour(id) 
res.json(deleted)
} catch(err){
res.json({message:err.message});
} 
})
router.patch("/:id",async(req,res)=>{      //update field by patch/done
try{
var{id}=req.params
var tour=req.body
var updatedtour= await updateTour(id,tour) 
res.json(updatedtour)
}catch(err){
res.json({message:err.message})
}
})
// router.get("/searchtour/:tour_id",async(req,res)=>{
// try{
// var {tour_id}=req.params
// var getbytour = await searchByTour(tour_id)
// res.json(getbytour)
// }
// catch(err){
// res.json({message:err.message})
// }
// })


module.exports=router
