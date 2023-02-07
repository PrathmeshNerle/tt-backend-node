const express = require("express");

const projectController = express.Router();

projectController.get("/proj",(req,res)=>{
    res.end("project is here done")
})



module.exports=projectController