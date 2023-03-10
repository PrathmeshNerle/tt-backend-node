const express = require("express");
const project=require("../models/projectModel.js")
const projectController = express.Router();

projectController.get("/proj",async(req,res)=>{
    const data= await project.find({})
  
    res.status(201).end(JSON.stringify(data))
})

projectController.get("/projectNames", async (req, res)=>{
    const data = await project.find({});

    const projectNames = data.map((el)=>{
        return {"projectName" : el.projectName}
    })

    res.status(201).send(JSON.stringify(projectNames));
})

// create a new project
projectController.post("/projectcreated",async(req,res)=>{
   
try {
    const {estimatedHours,manageBy,projectName,projectDescription}=req.body
    await project.create({
        "clientID":1234,
        estimatedHours, 
        manageBy, 
        projectName,
        projectDescription
    })
    res.status(201).end("project created successfully")
} catch (error) {
    res.status(504).end("All field are mandatory")
}
})

module.exports=projectController