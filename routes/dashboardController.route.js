const express = require("express");

const dashboardController = express.Router();

dashboardController.get("/dash",(req,res)=>{
    res.end("dashboaard is here done")
})



module.exports=dashboardController