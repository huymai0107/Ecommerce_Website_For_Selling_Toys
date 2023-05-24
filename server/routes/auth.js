const express = require ('express')
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/verifytoken');


router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.post("/logout",verifyToken, authController.logOut);

module.exports = router;

