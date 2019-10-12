const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const Partner = require("../../models/Partner");

// @route POST api/partners/register
// @desc Register partner
// @access Public
router.get('/test', (req,res) => {
    res.send("test");
})
router.post('/register', (req, res) => {
    /*const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }*/
    Partner.findOne({ email: req.body.managerEmail }).then(partner => {
        if (partner) {
            res.status(400).json({ email: "Email already exists! " })
        } else {
            const newPartner = new Partner({
                storeName: req.body.storeName,
                storeAddress: req.body.storeAddress,
                storeEmail: req.body.storeEmail,
                phone: req.body.phone,
                storeType: req.body.storeType,
                managerName: req.body.managerName,
                managerEmail: req.body.managerEmail,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPartner.password, salt, (err, hash) => {
                    if (err) throw err;
                    newPartner.password = hash;
                    newPartner
                        .save()
                        .then(user => res.send({success: true}))
                        .catch(err => console.log(err));
                });
            });
        }
    })
})
// @route POST api/partners/login
// @desc Login Partner to Partner Dashboard
// @access Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const email = req.body.managerEmail
    const password = req.body.password
    Partner.findOne({ email }).then(partner => {
        if (!partner) {
            res.status(400).json({emailnotfound: "Email was not found"})
        } else {
            bcrypt.compare(password, partner.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id : partner.id,
                        name: partner.name
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
                                token: "Partner " + token
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

// @route GET api/partners/get
// @desc get ALL partner data
// @access Public?
router.post('/get', (req, res) => {
    Partner.find()
        .then(partners => res.json(partners))
        .catch(err => console.log(err))
})

router.post('/get/:email', (req, res) => {
    const email = req.body.email
    Partner.findOne({email})
        .then(partner => res.json(partner))
        .catch(err => console.log(err))
})

module.exports = router