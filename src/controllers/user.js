//const path = require("path")
const { application } = require("express")
const express = require("express")
const fs = require("fs")

const User =  require("../modules/user")
const upload = require("../middleware/upload")
const router = express.Router()

router.post("/",upload.single("profile_pic")  , async (req,res)=>{
  // console.log( path.join(__dirname,"../uploads"))
  
    try{
       const user = await User.create({
           first_name : req.body.first_name,
           last_name : req.body.last_name,
           profile_pic : req.file.path,
       })
       return res.status(201).send({user})
    }catch(e){
       return res.status(500).json({message:e.message , status:"failed d"})  // server is failing here 
    }

 })

 router.patch("/:id",/*upload.single("profile_pic") ,*/ async(req,res)=>{
    try{
      const user = await User.findById(req.params.id)
 // method to delete the file inside upload
      await fs.unlink(`${user.profile_pic}`,(err)=>{
         if (err) throw err
         console.log("user profile_pic has been deleted")   
      })

        const userupdate = await User.findByIdAndUpdate(req.params.id,{
           profile_pic : req.file.path
        })
      res.status(201).send(userupdate)
    }catch(e){
       return res.status(500).json({message :e.message , status :"failed"})
    }
 })

router.delete("/:id", async(req,res)=>{
   try{
      const user = await User.findById(req.params.id)
      // method to delete the file inside upload
           await fs.unlink(`${user.profile_pic}`,(err)=>{
              if (err) throw err
              console.log("user profile_pic has been deleted")   
           })

         const userdelete = await User.findByIdAndDelete(req.params.id)

         return res.status(200).send(userdelete)
   }catch(e){
      return res.status(500).json({message :e.message , status :"failed"}) 
   }
})


module.exports = router
