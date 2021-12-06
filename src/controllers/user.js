//const path = require("path")
const { application } = require("express")
const express = require("express")

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

module.exports = router
