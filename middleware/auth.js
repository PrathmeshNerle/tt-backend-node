const jwt = require('jsonwebtoken');

const checkToken = (req,res,next)=>{
    const token = req.body.token||req.query.token||req.headers["x-access-token"]||req.headers["Authorization"];
    if(!token){
        return res.status(403).send("Token required");
    }
    try{
        console.log("first")
        // console.log(token)
        const result = jwt.verify(token,"TOKEN KEY");
        console.log(result)
        // req.user = result;
    }
    catch(err){
        return res.status(401).send('Invalid token');
    }
    return next();
}
module.exports = checkToken;
//shyam ==> user
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQwYWUwMGQ0NDNlZDJmYmY1MGFjMTM3IiwiZW1haWwiOiJzaHlhbSIsImlhdCI6MTY3ODQzNzkwMCwiZXhwIjoxNjc4NDQxNTAwfQ.vCI7nnREGIA3a8hQhBmx0c8B_uzidH8N3wMcuJBEcTE

// gaurav ==> admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQwYWRkYTRhYTEwMzEyNDdkOTIzNGQyIiwiZW1haWwiOiJnYXVyYXYiLCJpYXQiOjE2Nzg0Mzc5NzksImV4cCI6MTY3ODQ0MTU3OX0.iuZfhbs9CS1-4com7qTIqyfhI_rpYDUqh-63L7dELEI