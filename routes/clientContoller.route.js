const express = require("express");
const client=require("../models/clientModel.js")
const clientController = express.Router();

clientController.get("/new",(req,res)=>{
    res.end("client is here done")
})

clientController.post("/create",async (req,res)=>{
    const {clientName,role}=req.body
    const datetime=new Date()
    console.log("date and time is",datetime.toISOString());
    await client.create({
        clientName,
        "createdAt":datetime.toISOString(),
        "updatedAt":"how",
        "deletedAt":"hello",
        role
    })
    res.end("data save successfully")
})


module.exports=clientController