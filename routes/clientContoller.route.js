const express = require("express");
const client=require("../models/clientModel.js")
const clientController = express.Router();

clientController.get("/new",(req,res)=>{
    res.end("client is here done")
})

//To  Create a Client 
clientController.post("/create",async (req,res)=>{
    const {clientName}=req.body
    const datetime=new Date()
    try {
        
    await client.create({
        clientName,
        "createdAt":datetime.toISOString(),
        "updatedAt":datetime.toISOString(),
        "deletedAt":datetime.toISOString(),
        // role
    })
    res.status(201).end("Client created successfully")
    } catch (error) {
        res.status(500).end(error)
    }
})

// To Get the client list
clientController.get("/clientsdata",async(req,res)=>{
  try {
    const data=await client.find({})
    res.status(200).end(JSON.stringify(data))
  } catch (error) {
    res.status(500).end(error)
  } 
})


clientController.patch("/updateClient",async(req,res)=>{
    const {newClientName,_id}=req.body
    const datetime=new Date()
    await client.findOne({_id})
    await client.updateOne({_id},{
        clientName:newClientName,
        "updatedAt":datetime.toISOString(),
    })
    return res.send("Article updated success")
})

module.exports=clientController