const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const clientController = require("./routes/clientContoller.route");
const projectController = require("./routes/projectController.route");
const dashboardController = require("./routes/dashboardController.route");
const workspaceController = require("./routes/workspaceController.route");
const userController = require("./routes/userContoller.route");
const timerRouter = require("./routes/timerController.route");
const timeEditorController = require("./routes/timeEditorController.route");


const app=express()

const connectionparams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.set('strictQuery', true);

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Prathmesh11:Prathmesh11@cluster0.o4lbk.mongodb.net/Trakify",connectionparams).then(()=>{
    console.log("conneted to db");
}).catch(err=>{
    console.log(err);
})
app.get("/",(req,res)=>{
    // console.log("article data is",db.article.find())
    res.end("home route")
})
app.use("/client", clientController);
app.use("/projects",projectController);
app.use("/dashboard",dashboardController);
app.use("/user",userController);
app.use("/workspace",workspaceController);
app.use("/timer", timerRouter )
app.use("/settings", timeEditorController)

app.listen(8000,()=>{
    console.log("server started on 8000");
})