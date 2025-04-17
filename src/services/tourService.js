const tourModel = require('../models/tourModel')

const renderTour = () => {
    try {
        const tours = Tour.getALLTours()
        return tours
    } catch (error) {
        console.log('Lỗi khi lấy danh sách tour:', error)
        throw error
    }
}

const renderUser = (req) => {
    const user = req.session.user || null
    return user
}
const getTourById = (tourId) => {
    return new Promise((resolve, reject) => {
        tourModel.getTourById(tourId, (error, tour) => {
            if (error) {
                reject(error);
            } else {
                resolve(tour);
            }
        });
    });
};

// Hàm lấy danh sách ảnh của tour
const getTourImages = (tourId) => {
    return new Promise((resolve, reject) => {
        tourModel.getImageByTourId(tourId, (error, images) => {
            if (error) {
                reject(error);
            } else {
                resolve(images);
            }
        });
    });
};

module.exports = { getTourImages, getTourById };


