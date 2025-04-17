
const express = require('express')
const router = express.Router()
const { getHomePage, getToursPage, getHotelsPage, getTourDetailPage, getIntroducPage } = require('../controllers/homeController')
const { checkNotLoggedIn, checkLoggedIn, checkAdmin } = require('../middlewares/authMiddleware')
const { getAdminPage } = require('../controllers/adminController')

router.get('/', getHomePage)
router.get('/tours', getToursPage)
router.get('/hotels', getHotelsPage)
router.get('/tours/:id', checkLoggedIn, getTourDetailPage)
router.get('/introduction', getIntroducPage)
router.get('/admin', checkAdmin, getAdminPage)

module.exports = router