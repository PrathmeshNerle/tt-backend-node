const express = require('express')

const timerRouter = express.Router();
const timer = require("../models/timerModel.js")




timerRouter.get("/", async(req, res)=>{
    const data = await timer.find({});
    res.status(200).send(JSON.stringify(data))
})


timerRouter.post("/", async (req, res)=>{

    try {
        

        const {description,duration, endTime,
             projectId,startTime,timerId, userId  } = req.body;

             const datetime =  new Date();

        await timer.create({
            description,
            duration,
            endTime,
            projectId,
            "startTime" :datetime.toISOString(),
            timerId,
            userId
        })
        res.status(201).send("Timer created")


    } catch (error) {
        console.log(error)
        res.status(504).end("All field are mandatory")
    }
})

timerRouter.patch("/", async (req, res)=>{

    try {
        

        const {description,duration, endTime,
             projectId,startTime,timerId, userId  } = req.body;

             const datetime = new Date();


        await timer.findOne({timerId})
        await timer.updateOne({timerId}, {
            description,
            duration,
            endTime : datetime.toISOString(),
            projectId,
            timerId,
            userId
        })
        res.status(201).send("Timer updated")


    } catch (error) {
        console.log(error)
        res.status(504).end("All field are mandatory")
    }
})

module.exports = timerRouter
