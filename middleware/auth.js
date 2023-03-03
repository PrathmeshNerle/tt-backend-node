const jwt = require('jsonwebtoken');

const checkToken = (req,res,next)=>{
    const token = req.body.token||req.query.token||req.headers["x-access-token"];
    if(!token){
        return res.status(403).send("Token required");
    }
    try{
        const result = jwt.verify(token,"TOKEN_KEY");
        req.user = result;
    }
    catch(err){
        return res.status(401).send('Invalid token');
    }
    return next();
}
module.exports = checkToken;