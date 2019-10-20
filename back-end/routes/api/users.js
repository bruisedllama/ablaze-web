const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
// @route POST api/users/register
// @desc Register users
// @access Public
router.get('/test', (req,res) => {
    res.send("test");
})
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            res.status(400).json(({ email: "Email already exists! " }))
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.send({success: true}))
                        .catch(err => console.log(err));
                });
            });
        }
    })
})
// @route POST api/users/login
// @desc Login User
// @access Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email }).then(user => {
        if (!user) {
            res.status(400).json({emailnotfound: "Email was not found"})
        } else {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id : user.id,
                        name: user.name
                    };
                    jwt.sign(
                        payload,
                        keys.secret,
                        {
                            expiresIn: 31556926 // 1 year 
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                    );
                } else {
                    res.status(400).json({ passwordincorrect: "Password incorrect" });
                }
            })
        }
    })
});

// @route GET api/users/get
// @desc get all users and their data
// @access Public?
router.get('/get', (req, res) => {
    User.find({})
        .then(users => res.json(users))
        .catch(err => console.log(err))
})

// @route GET api/users/get/:email
// @desc get user data by email
// @access Public?
router.get('/get/:email', (req, res) => {
    User.findOne({email: req.params.email})
        .then(user => res.json(user))
        .catch(err => console.log(err))
})

module.exports = router