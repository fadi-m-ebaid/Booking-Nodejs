const express = require('express');
const router = express.Router();

const roomsModel=require('../models/Rooms')
 var {createroom,getroom,deleteroom,updateroom}=require('../controllers/room')




    router.post("/",async(
      req,res,next)=>{//done
        var room=req.body
        try{
          var savedroom=await createroom(room)
          res.status(201).json(savedroom)
        }catch(err){
          res.status(422).json({message:err.message}) 
        }
        })



        router.get("/",async(
          req,res,next)=>{//done
           
            try{
              var savedroom=await getroom()
              res.status(201).json(savedroom)
            }catch(err){
              res.status(422).json({message:err.message}) 
            }
            })

          
 router.delete("/:id",async(req,res)=>{   //done
  try{
  var{id}=req.params
  
  var deleted=await deleteroom(id) 
  res.json(deleted)
  } catch(err){
   res.json({message:err.message});
  } 
})
router.patch("/:id",async(req,res)=>{      //update field by patch/done
  try{
     var{id}=req.params
     var room=req.body
    var updatedroom= await updateroom(id,room) 
     res.json(updatedroom)
   }catch(err){
   res.json({message:err.message})
   }
  })
     


// export default router;
module.exports=router