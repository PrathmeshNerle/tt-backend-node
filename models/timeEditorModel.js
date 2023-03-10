const mongoose = require('mongoose');


const timeEditorSchema = new mongoose.Schema({
    editable : {type:Boolean, default:false}
})

module.exports=mongoose.model("timeEditor",timeEditorSchema);