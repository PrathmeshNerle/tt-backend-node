const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
    org_id:{type:mongoose.Types.ObjectId, default:null},
    user_id:{type:mongoose.Types.ObjectId, default:null},
    status:{type:String,unique:true},
    role_id:{type:Number},
    workspace_type:{type:String},
    name:{type:String},
    org_name:{type:String}
});

module.exports=mongoose.model("workspace",workspaceSchema);