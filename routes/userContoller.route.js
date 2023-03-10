const express = require("express");
const User=require("../models/userModel.js")
const userController = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkToken = require("../middleware/auth.js");
const authandadmin = require("../middleware/auth&admin.js");

userController.post("/signup",async (req,res)=>{
    try{
        const {email,password, role} = req.body;
        if(!(email && password)){
            return res.status(400).send("Email and password is mandatory.");
        }
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(409).send("This email is already in use. Please login if possible.");
        }
        const encryptedPassword = await bcrypt.hash(password,13);

        const dateofjoining = new Date();

        const user = await User.create({
            email:email.toLowerCase(),
            password:encryptedPassword,
            date_of_joining : dateofjoining.toISOString(),
            role : role
        });
        // const token = jwt.sign(
        //     {user_id:user._id,email},
        //     "TOKEN KEY",
        //     {
        //         expiresIn: "1h"
        //     }
        // );
        // const finalUser =  await User.findOneAndUpdate({email}, {
        //     token: token
        // })
        // user.token = token;

        return res.status(201).json(user);
    }
    catch(err){
        console.log(err);   
    }
});

userController.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;
        // console.log(email, password)
        if(!(email && password)){
            res.status(400).send("Email and password is mandatory.");
        }
        const user = await User.findOne({ email });
        // console.log(user, "user")
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        // console.log(isCorrectPassword)
        if(user && isCorrectPassword){
            const token = jwt.sign(
                {user_id:user._id,email},
                "TOKEN KEY",
                {
                    expiresIn: "1h"
                }
            );
            user.token = token; 
            return res.status(200).json(user);
        }
        return res.status(400).send('Invalid credentials');
    }
    catch(err){
        console.log(err);
    }
});

userController.post("/forgotpassword",(req,res)=>{
    res.end("client is here done")
});

userController.post("/changepassword",async(req,res)=>{
    try{
        const {email,oldPassword,password,confimPassword} = req.body;
        if(!(oldPassword && password && confimPassword )){
            return res.status(400).send("Password and confirm password both are mandatory.");
        }
        if(password !== confimPassword){
            return res.status(400).send("Password and confirm password should be same.");
        }
        const user = await User.findOne({ email });
        if(user && user.password === oldPassword){
            user.password = password; 
            return res.status(200).json(user);
        }else{
        return res.status(400).send('Invalid credentials');
        }
    }
    catch(err){
        console.log(err);
    }
});

userController.get("/users", checkToken ,authandadmin, async (req, res)=>{
    const data = await User.find({})

    return res.status(201).send(data)
})

userController.post("/logout" , async (req, res)=>{
    
    // console.log(req.body)

    const {_id} = req.body;

    // LOGOUT CODE 

    // const oneUser= await User.findByIdAndUpdate({_id})
    // console.log(oneUser)
    // if(req.headers){
    // // console.log(req.headers);
    // res.send("ok")
    // }
})


userController.get("/profile", async (req, res)=>{
    // const user = await User.find({})
    res.send("profile information")
})


module.exports=userController;