const connection = require('../config/database')

const getALLTours = (callback) => {
    // Truy vấn cơ sở dữ liệu
    // Kiểm tra nếu callback là một hàm
    if (typeof callback !== 'function') {
        console.error("Callback phải là một hàm.");
        return;
    }
    // Truy vấn cơ sở dữ liệu
    connection.query('SELECT * FROM Tours', (err, rows) => {
        if (err) {
            return callback(err, null); // Trả về lỗi nếu có
        }

        if (!Array.isArray(rows)) {
            return callback(new Error('Dữ liệu trả về không phải là mảng'), null);
        }

        callback(null, rows); // Trả về kết quả là rows
    });
}

const getNationalTour = (callback) => {
    if (typeof callback !== 'function') {
        console.log('Callback phải là một hàm.')
        return
    }
    connection.query('SELECT * FROM Tours WHERE tour_type= "Trong nước"', (err, rows) => {
        if (err) {
            return callback(err, null)
        }
        if (!Array.isArray(rows)) {
            return callback(new Error('Dữ liệu trả về không phải là mảng'), null)
        }

        callback(null, rows)

    })
}

const getInternationalTour = (callback) => {
    if (typeof callback !== 'function') {
        console.log('Callback phải là một hàm.')
        return
    }
    connection.query('SELECT * FROM Tours WHERE tour_type= "Ngoài nước"', (err, rows) => {
        if (err) {
            return callback(err, null)
        }
        if (!Array.isArray(rows)) {
            return callback(new Error('Dữ liệu trả về không phải là mảng'), null)
        }

        callback(null, rows)

    })
}

const getTourById = (id, callback) => {
    const query = 'SELECT * FROM Tours WHERE tour_id = ?'
    connection.query(query, [id], (err, rows) => {
        if (err) return callback(err, null)
        callback(null, rows[0])
    })
}

const getImageByTourId = (tourId, callback) => {
    const query = 'SELECT * FROM TourImages WHERE tour_id = ?'
    connection.query(query, [tourId], (err, results) => {
        if (err) return callback(err, null)
        callback(null, results)
    })
}

module.exports = { getTourById, getALLTours, getImageByTourId, getNationalTour, getInternationalTour };