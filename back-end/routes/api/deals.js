const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load User model
const Deal = require("../../models/Deal");


router.get('/test', (req,res) => {
    res.send("test");
})
// @route POST api/deals/createnew
// @desc create a new deal, write to deals collection
// @access Public
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

// @route GET api/deals/get
// @desc get ALL deal data
// @access Public?
router.get('/get', (req, res) => {
    Deal.find()
        .then(partners => res.json(partners))
        .catch(err => console.log(err))
})

// @route GET api/deals/get-partner
// @desc get all deals for a specific partner by ID
// @access Public?
router.get('/get-partner/:id', (req, res) => {
    Deal.find({issuer: req.params.id})
        .then(partners => res.json(partners))
        .catch(err => console.log(err))
})

// @route POST api/deals/update/:id
// @desc update deal data (e.g. de-activate)
// @access Public?
router.post('/update/:id', (req, res) => {
    Deal.findByIdAndUpdate(req.params.id, req.body)
        .then(partner => res.json(partner))
        .catch(err => console.log(err))
})

module.exports = router