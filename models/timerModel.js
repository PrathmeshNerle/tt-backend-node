const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
    description:{type:String},
    duration:{type:String},
    endTime:{type:String,default:null},
    projectId:{type:String},
    startTime:{type:String},
    timerId: {type:Number, default:null},
    userId:{type:Number}
},{ 
    timestamps: true
  });

module.exports=mongoose.model("timer",timerSchema);