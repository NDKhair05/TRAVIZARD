const express = require("express");
const router = express.Router();
const { postLogInUser, logOutUser } = require("../controllers/authController");
const { checkNotLoggedIn } = require('../middlewares/authMiddleware')
const { getLogInPage, getRegisterPage } = require('../controllers/homeController')
const { postCreateUser } = require('../controllers/userController')

router.get("/login", checkNotLoggedIn, getLogInPage);
router.post("/login", checkNotLoggedIn, postLogInUser);
router.get("/logout", logOutUser);
router.get("/register", checkNotLoggedIn, getRegisterPage);
router.post("/register", postCreateUser)

module.exports = router;
