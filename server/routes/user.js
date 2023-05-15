const express = require ('express');
const { verifyTokenAndAuthAdmin, verifyToken } = require('../middlewares/verifytoken');
const userController = require('../controllers/userController');
const router = express.Router();

//GET ALL USERS
router.get("/getall",verifyToken, userController.getAllUsers);
//GET USER BY ID
router.get("/getbyid/:id",verifyToken, userController.getUserbyID);
//DELETE USER BY ID
router.delete("/deletebyid/:id",verifyTokenAndAuthAdmin, userController.deleteUserbyID);

module.exports = router;