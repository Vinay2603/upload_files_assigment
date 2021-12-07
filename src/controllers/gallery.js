const express = require("express")
const fs = require("fs")
const Gallery = require("../modules/gallery")
const upload = require("../middleware/upload")
const gallery = require("../modules/gallery")
const router = express.Router()

router.post("/",upload.any("pictures") , async(req,res)=>{
   const filePaths = req.files.map((file)=> file.path)
    try{
       const gallery = await Gallery.create({
           pictures :filePaths,
           user_id : req.body.user_id,
       })

       return res.status(201).send({gallery})
    }catch(e){
        return res.status(500).json({message: e.message , status:"failed"})

    }
})

router.delete("/:id",upload.any("pictures") , async(req,res)=>{
    try{
     const gallery = await Gallery.findById(req.params.id)
   // method to delete the file inside upload
   await fs.unlink(`${gallery.pictures}`,(err)=>{
    if (err) throw err
    console.log("gallery profile_pic has been deleted")   
 })

const gallerydelete = await Gallery.findByIdAndDelete(req.params.id)
       return res.status(200).send(gallerydelete)
    }catch(e){
        return res.status(500).json({message: e.message , status:"failed"})
    }
})
module.exports = router 