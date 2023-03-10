const mongoose=require("mongoose")

const Clientschema=new mongoose.Schema({
    clientName:String,
    createdAt:String,
    updatedAt:String,
    deletedAt:String,
    // role:String
})

module.exports=mongoose.model("client",Clientschema)