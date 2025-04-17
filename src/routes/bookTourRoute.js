const express = require('express')
const router = express.Router()
const { postBookingTour, postSearchTour } = require('../controllers/tourController')

router.post('/book-tour', postBookingTour)
router.post('/search-tour', postSearchTour)

module.exports = router