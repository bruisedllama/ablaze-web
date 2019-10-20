const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load Partner model
const Partner = require("../../models/Partner");

router.get('/test', (req,res) => {
    res.send("test");
})
// @route POST api/partners/register
// @desc Register partner
// @access Public
router.post('/register', (req, res) => {
    /*const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }*/
    Partner.findOne({ managerEmail: req.body.managerEmail }).then(partner => {
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
                        .then(partner => res.send({success: true}))
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
    const managerEmail = req.body.email
    const password = req.body.password
    Partner.findOne({ managerEmail }).then(partner => {
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
router.get('/get', (req, res) => {
    Partner.find()
        .then(partners => res.json(partners))
        .catch(err => console.log(err))
})

// @route GET api/partner/get/:email
// @desc get partner data by email
// @access Public?
router.get('/get/:email', (req, res) => {
    Partner.findOne({managerEmail: req.params.email})
        .then(partner => res.json(partner))
        .catch(err => console.log(err))
})


// @route POST api/partner/update/:id
// @desc update partner data
// @access Public?
router.post('/update/:id', (req, res) => {
    Partner.findByIdAndUpdate(req.params.id, req.body)
        .then(partner => res.json(partner))
        .catch(err => console.log(err))
})

module.exports = router