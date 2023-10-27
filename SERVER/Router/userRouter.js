const express = require("express")

const router = express.Router()

const {loginUser, registerUser} = require("../Controller/userCntrl")


router.post('/login', loginUser);

router.post('/register', registerUser);

module.exports = router