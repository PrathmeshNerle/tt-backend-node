const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const clientController = require("./routes/clientContoller.route");
const projectController = require("./routes/projectController.route");
const dashboardController = require("./routes/dashboardController.route");
const workspaceController = require("./routes/workspaceController.route");


const app=express()

const connectionparams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

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

app.listen(8080,()=>{
    console.log("server started on 8080");
})