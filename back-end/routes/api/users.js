const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const authMiddleware = require('../../middleware/RequestAuth');
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
// @route POST api/users/register
// @desc Register user
// @access Public
router.get("/data", authMiddleware.checkToken, function(req,res) {
    res.json({
        message:"Success",
    })
})
module.exports = router