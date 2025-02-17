const express= require('express');
const { getAllusers, registerController, loginController } = require('../controllers/userControllers');

// router object 
const router = express.Router();
//Get all users || GET 
router.get('/all-users',getAllusers)

//CREATE USER || POST 
router.post('/register',registerController)

// LOGIN || POST
router.post('/login',loginController)

module.exports =router