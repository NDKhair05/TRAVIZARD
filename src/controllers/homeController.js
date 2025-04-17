const connection = require("../config/database")
const tourService = require('../services/tourService')
const tourModel = require('../models/tourModel')
const { renderTour, renderUser } = require('../services/tourService')

const getHomePage = (req, res) => {
    const user = req.session.user || null;

    // Gọi getALLTours và truyền callback xử lý kết quả
    tourModel.getNationalTour((err, naTours) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách tour:', err);
            return res.status(500).send('Lỗi server');
        }
        tourModel.getInternationalTour((err, interTours) => {
            if (err) {
                console.error('Lỗi khi lấy danh sách tour:', err);
                return res.status(500).send('Lỗi server');
            }
            res.render('home', { user, naTours, interTours, isHome: true });
        })
    });
};

const getToursPage = (req, res) => {
    const user = req.session.user || null;
    tourModel.getALLTours((err, tours) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách tour:', err);
            return res.status(500).send('Lỗi server');
        }

        // Render trang chủ với dữ liệu tour
        res.render('tours', { user, tours, isTours: true });
    });
}

const getHotelsPage = (req, res) => {
    const user = req.session.user || null;
    res.render('hotels', { user, isHotels: true })
}

const getLogInPage = (req, res) => {
    res.render('login')
}

const getRegisterPage = (req, res) => {
    res.render('register')
}

const getIntroducPage = (req, res) => {
    const user = req.session.user || null;
    res.render('introduction', { user, isIntroduction: true })
}

const getTourDetailPage = async (req, res) => {
    const tourId = req.params.id
    const user = req.session.user || null;

    try {
        // Lấy thông tin chi tiết tour
        const tour = await tourService.getTourById(tourId);

        if (!tour) {
            return res.status(404).send('Tour not found');
        }

        // Lấy danh sách ảnh của tour
        const images = await tourService.getTourImages(tourId);

        // Render trang chi tiết tour
        res.render('tourDetail', { tour, images, user });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).send('Đã xảy ra lỗi khi lấy dữ liệu');
    }

}



module.exports = {
    getHomePage,
    getToursPage,
    getHotelsPage,
    getLogInPage,
    getRegisterPage,
    getTourDetailPage,
    getIntroducPage,
}