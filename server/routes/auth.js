const express = require ('express')
const router = express.Router();
const Customer = require("../models/Customer")
//register
router.post("/register", async (req, res) =>{
    const newCustomer = new Customer({        
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedCustomer = await newCustomer.save();
        res.status(201).json({savedCustomer})
    } catch(err){
        res.status(500).json({err})
    }
})

module.exports = router;