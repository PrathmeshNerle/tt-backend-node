const express = require("express");
const Workspace=require("../models/workspaceModel")
const workspaceController = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const userController = require("./userContoller.route");

workspaceController.post("/create",async (req,res)=>{
    try{
        const {orgId,userId,status,roleId,workspaceType,name,orgName} = req.body;
        if(!(orgId && userId && status && roleId && workspaceType && name && orgName)){
            return res.status(400).send("Please provide the mandatory fields.");
        }
        const existingWorkspace = await Workspace.find({ user_id:userId, name:name });

        if(existingWorkspace){
            console.log(existingWorkspace)
            return res.status(409).send("This workspace name is already in use. Please change the name.");
        }

        const workspace = Workspace.create({});
        const encryptedPassword = await bcrypt.hash(password,13);

        const user = await User.create({
            email:email.toLowerCase(),
            password:encryptedPassword
        });
        const token = jwt.sign(
            {user_id:user._id,email},
            "TOKEN KEY",
            {
                expiresIn: "1h"
            }
        );
        user.token = token;

        return res.status(201).json(user);
    }
    catch(err){
        console.log(err);   
    }
});

// userController.post("/login",async (req,res)=>{
//     try{
//         const {email,password} = req.body;
//         if(!(email && password)){
//             res.status(400).send("Email and password is mandatory.");
//         }
//         const user = await User.findOne({ email });
//         const isCorrectPassword = await bcrypt.compare(password, user.password);
//         if(user && isCorrectPassword){
//             const token = jwt.sign(
//                 {user_id:user._id,email},
//                 "TOKEN KEY",
//                 {
//                     expiresIn: "1h"
//                 }
//             );
//             user.token = token; 
//             return res.status(200).json(user);
//         }
//         return res.status(400).send('Invalid credentials');
//     }
//     catch(err){
//         console.log(err);
//     }
// });

// userController.post("/forgotpassword",(req,res)=>{
//     res.end("client is here done")
// });

// userController.post("/changepassword",async(req,res)=>{
//     try{
//         const {email,oldPassword,password,confimPassword} = req.body;
//         if(!(oldPassword && password && confimPassword )){
//             return res.status(400).send("Password and confirm password both are mandatory.");
//         }
//         if(password !== confimPassword){
//             return res.status(400).send("Password and confirm password should be same.");
//         }
//         const user = await User.findOne({ email });
//         if(user && user.password === oldPassword){
//             user.password = password; 
//             return res.status(200).json(user);
//         }else{
//         return res.status(400).send('Invalid credentials');
//         }
//     }
//     catch(err){
//         console.log(err);
//     }
// });

module.exports=workspaceController;