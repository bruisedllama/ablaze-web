const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load User model
const Deal = require("../../models/Deal");

// @route POST api/partners/register
// @desc Register partner
// @access Public
router.get('/test', (req,res) => {
    res.send("test");
})
router.post('/createnew', (req, res) => {
    const newDeal = new Deal({
        issuer: req.body.issuer,
        item: req.body.item,
        origPrice: req.body.origPrice,
        deal: req.body.deal,
        details: req.body.details
    });
    newDeal
        .save()
        .then(deal => res.send({success: true}))
        .catch(err => console.log(err));
})

// @route POST api/deals/get
// @desc get ALL deal data
// @access Public?
router.post('/get', (req, res) => {
    Deal.find()
        .then(partners => res.json(partners))
        .catch(err => console.log(err))
})

// @route POST api/deals/get-partner
// @desc get all deals for a specific partner
// @access Public?
router.post('/get-partner', (req, res) => {
    const issuer = req.body.issuer
    Deal.find({issuer})
        .then(partners => res.json(partners))
        .catch(err => console.log(err))
})

// @route POST api/deals/update/deactivate
// @desc update deal data -- deactivate
// @access Public?
router.post('/update/deactivate', (req, res) => {
    const issuer = req.body.managerEmail
    Deal.findOneAndUpdate({issuer}, req.body)
        .then(partner => res.json(partner))
        .catch(err => console.log(err))
})

module.exports = router