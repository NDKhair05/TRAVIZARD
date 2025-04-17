const express = require('express')
const app = express()
const port = 3000
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const authRoutes = require('./routes/authRoutes')
const bookingTourRoutes = require('./routes/bookTourRoute')
const session = require('express-session')
const flash = require('connect-flash')

require('./helper')
//config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    session({
        secret: 'my-super-secret-key', // Khóa bí mật, đặt giá trị mạnh
        resave: true, // Không lưu lại session nếu không thay đổi
        saveUninitialized: true, // Không lưu session trống
        cookie: {
            maxAge: 1000 * 60 * 60, // Cookie tồn tại trong 1 giờ
            secure: false, // Đặt true nếu dùng HTTPS
            httpOnly: true, // Chỉ sử dụng cookie trong HTTP(S), không thể truy cập từ JavaScript client
        },
    })
)

app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.invalid_password_msg = req.flash('invalid_password_msg');
    res.locals.invalid_email_msg = req.flash('invalid_email_msg');
    res.locals.invalid_username_msg = req.flash('invalid_username_msg');
    res.locals.invalid_user_msg = req.flash('invalid_user_msg');
    next();
});
//config view engine
configViewEngine(app)

//Khai báo route
app.use('/', webRoutes)
app.use('/', authRoutes)
app.use('/', bookingTourRoutes)

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})