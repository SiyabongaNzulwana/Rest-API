 const express = require('express')
 const router = express.Router()
 const Developer = require('../models/developer')

// get a list of developers from the DB
 router.get('/developers', function (req, res, next) {
  //  Developer.find({}).then(function(developers){
  //    res.send(developers)
  //  })
   Developer.geoNear(
     {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
     {MaxDistance: 100000, spherical: true}
   ).then(function (developer) {
     res.send(developer)
   })
 })

// add a new developer to the BD
 router.post('/developers', function (req, res, next) {
   Developer.create(req.body).then(function (developer) {
     res.status(201).send(developer)
   }).catch(next)
 })

// update a developer in the DB
 router.put('/developers/:id', function (req, res, next) {
   Developer.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
     Developer.findOne({_id: req.params.id}).then(function (developer) {
       res.status(200).send(developer)
     })
   })
 })

// delete a developer in the DB
 router.delete('/developers/:id', function (req, res, next) {
   Developer.findByIdAndRemove({_id: req.params.id}).then(function (developer) {
     res.send(developer)
   })
 })

 module.exports = router
