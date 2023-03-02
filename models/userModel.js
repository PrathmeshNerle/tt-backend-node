const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name:{type:String, default:null},
    last_name:{type:String, default:null},
    email:{type:String,unique:true},
    password:{type:String},
    token:{type:String},
    profile_pic:{type:String},
    status:{type:String},
    date_of_joining:{type:Date},
    date_of_birth:{type:Date}
},{ timestamps: true });

module.exports=mongoose.model("user",userSchema);