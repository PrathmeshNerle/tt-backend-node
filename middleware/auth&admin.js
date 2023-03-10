const jwt = require('jsonwebtoken');
const User = require("../models/userModel.js")

const authandadmin =async (req,res,next)=>{
    const token = req.body.token||req.query.token||req.headers["x-access-token"]||req.headers["Authorization"];
    if(!token){
        return res.status(403).send("Token required");
    }
    try{
        console.log("second")
        // console.log(token)
        const result = jwt.verify(token,"TOKEN KEY");
        console.log(result)

        const email = result.email;
        
        const user = await User.find({email});
        // console.log(user)
        const [{role}] = user;
        // console.log(role)

        if(role == 'admin'){
            return next()
        }else{
            return res.status(401).send("Person does not have access to this route")
        }
        // req.user = result;
    }
    catch(err){
        return res.status(401).send('Invalid token');
    }
    return next();
}
module.exports = authandadmin;