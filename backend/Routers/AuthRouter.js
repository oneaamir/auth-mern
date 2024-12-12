
const express = require('express');
const { signup,login} = require("../controllers/AuthController");
const { signupValidation, loginValidation}= require("../middleware/AuthValidation")

const router = express.Router();


router.get('/login',(req,res)=>{
    res.send('login success');
});

router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login);



module.exports = router;