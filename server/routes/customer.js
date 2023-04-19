const express = require ('express');
const { verifyTokenAndAuthor } = require('../middlewares/verifytoken');
const router = express.Router();

// router.put("/id", verifyTokenAndAuthor, (req, res) =>{
//     if(req.user.id === req.params.id || req.user.isAdmin){
//         if(req.body)
//     }
// })

module.exports = router;