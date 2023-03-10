const express = require("express");

const timeEditorController = express.Router();

timeEditorController.get("/",(req,res)=>{
    // const data= 
    res.end("Time editor controller")
})



module.exports=timeEditorController