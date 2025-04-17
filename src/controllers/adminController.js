const connection = require('../config/database')
const tourModel = require('../models/tourModel')

const getAdminPage = (req, res) => {
    const user = req.session.user || null;

    tourModel.getALLTours((err, tours) => {
        if (err) {
            console.log('Lỗi khi render tour:', err)
            return res.status(500).send('Lỗi server')
        }
        res.render('admin', { user, tours })
    })

}

module.exports = {
    getAdminPage
}