const express= require("express")
const connect = require("./configs/db")
const userController = require("./controllers/user")
const galleryController = require("./controllers/gallery")
const app = express()

app.use("/users", userController)
app.use("/gallery", galleryController)
app.use(express.json())


app.listen(2244, async ( )=>{
   await connect()
    console.log("listing on port 2244" );

})
