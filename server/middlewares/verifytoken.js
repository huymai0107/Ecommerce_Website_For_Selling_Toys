const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) =>{
    const token = req.headers.token
    if(token){
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) =>{
            if(err) return res.status(403).json("Invalid token" + err);
            req.user = user;
            next();
        })
    }
    else{
        return res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAndAuthAdmin = (req, res, next) =>{
    verifyToken(req, res, () =>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next();
        } else{
            return res.status(401).json("You are not allowed")
        }
    })
}


module.exports = {verifyToken, verifyTokenAndAuthAdmin}