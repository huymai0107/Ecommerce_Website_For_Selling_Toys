const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart");

let refreshTokens = [];

const authController = {
  //REGISTER
  registerUser: async (req, res) =>{
    const newCustomer = new User({        
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET) 
    });
    const newCart = new Cart({
      userId: newCustomer._id
    })
    try{
        const savedCustomer = await newCustomer.save();
        const savedCart = await newCart.save();
        return res.status(201).json({savedCustomer}).json({savedCart})
    } catch(err){
        return res.status(500).json({err})
    }
},

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "30d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "365d" }
    );
  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user)
            {
                return res.status(401).json("Invalid username")
            }
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET)
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(Originalpassword !== req.body.password)
        {
            return res.status(401).json("Invalid password")
        }
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            paht:"/",
            sameSite:"strict",

        })

        const { password, ...others} = user._doc
        return res.status(200).json({others, accessToken})
    } catch (err) {
      res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure:false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  //LOG OUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
};

module.exports = authController;