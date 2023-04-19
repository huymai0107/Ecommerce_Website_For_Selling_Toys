const express = require ('express')
const router = express.Router();
const Customer = require("../models/Customer")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) =>{
    const newCustomer = new Customer({        
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET) 
    });
    try{
        const savedCustomer = await newCustomer.save();
        res.status(201).json({savedCustomer})
    } catch(err){
        res.status(500).json({err})
    }
})
//login
router.post("/login", async (req, res) =>{
    try{
        const customer = await Customer.findOne({username: req.body.username});
        if(!customer)
            {
                res.status(401).json("Invalid username")
            }
        const hashedPassword = CryptoJS.AES.decrypt(customer.password, process.env.PASS_SECRET)
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(Originalpassword !== req.body.password)
        {
            res.status(401).json("Invalid password")
        }
        const accessToken = jwt.sign({
             id :customer._id,
             isAdmin: customer.isAdmin
        }, process.env.JWT_SECRET, {expiresIn: "3d"});
        const { password, ...others} = customer._doc
        res.status(200).json({others, accessToken})

    } catch (err){
        res.status(500).json(err);
    }
})
module.exports = router;