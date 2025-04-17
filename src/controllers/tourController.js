const connection = require('../config/database')

const postBookingTour = (req, res) => {
    const { tourId, userId, travelDate, numberOfPeople, totalPrice } = req.body;
    console.log(req.body)
    console.log({ tourId, userId, travelDate, numberOfPeople, totalPrice })
    // Kiểm tra dữ liệu đầu vào
    if (!tourId || !userId || !travelDate || !numberOfPeople || !totalPrice) {
        console.error('Thiếu dữ liệu đầu vào:', { tourId, userId, travelDate, numberOfPeople, totalPrice });
        return res.status(400).send('Dữ liệu không hợp lệ!');
    }

    const bookingDate = new Date(); // Ngày đặt tour là ngày hiện tại

    // Query chèn dữ liệu vào bảng BookingTours
    const query = `
        INSERT INTO BookingTours (tour_id, user_id, booking_date, travel_date, number_of_people, total_price)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Thực thi query
    connection.query(
        query,
        [tourId, userId, bookingDate, travelDate, numberOfPeople, totalPrice],
        (error, results) => {
            if (error) {
                console.error('Lỗi khi đặt tour:', error);
                return res.status(500).send('Lỗi server!');
            }

            // Trả kết quả cho client
            res.status(200).json({
                message: 'Đặt tour thành công!',
                bookingId: results.insertId, // ID tự động tăng của booking
            });
        }
    );
}


const postSearchTour = (req, res) => {
    const { destination, travel_date, departure } = req.body;

    let query = "SELECT * FROM Tours WHERE departure = ?";
    let values = [departure]; // Bắt buộc phải có departure

    if (destination && destination.trim() !== "") {
        query += " AND destination LIKE ?";
        values.push(`%${destination}%`);
    }

    if (travel_date && travel_date.trim() !== "") {
        query += " AND dep_date LIKE ?";
        values.push(`%${travel_date}%`);
    }


    console.log(query);
    console.log(values);

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Lỗi truy vấn CSDL' });
        }
        res.json(results);
    });
};

module.exports = { postBookingTour, postSearchTour }