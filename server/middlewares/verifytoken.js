const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) =>{
    const authHeader = req.headers.verifyToken
    if(authHeader){
        jwt.verify(token, process.headers.JWT_SECRET, (err, user) =>{
            if(err) res.status(403).json("token is not valid!");
            req.user = user;
            next();
        })
    }
    else{
        return res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAndAuthor = (req, res, next) =>{
    verifyToken(req, res, () => {
        if( req.user.id == req.params.id || req.user.isAdmin)
        {
            next
        }
        else{
            res.status(403).json("You are not alowed to do that")
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthor }