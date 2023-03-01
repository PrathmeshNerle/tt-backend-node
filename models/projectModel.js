const mongoose=require("mongoose")
const productSchema={
    clientID:Number,
    estimatedHours:String, 
    manageBy:String, 
    projectDescription:String,
    projectName:String
}

module.exports=mongoose.model("projects",productSchema)