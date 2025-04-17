const checkNotLoggedIn = (req, res, next) => {
    if (req.session.user) {
        console.log(req.session.user)
        return res.redirect("/"); // Đã đăng nhập, chuyển hướng về trang chính
    }
    next(); // Chưa đăng nhập, cho phép tiếp tục
};

const checkLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        console.log(req.session.user)
        console.log(req.flash)
        req.flash('error_msg', 'Chưa đăng nhập')
        return res.redirect('/') // Chưaưa đăng nhập, chuyển hướng về trang chq nh
    }
    next(); // Đã đăng nhập, cho phép tiếp tục
};

const checkAdmin = (req, res, next) => {
    // Kiểm tra nếu người dùng đã đăng nhập
    if (!req.session.user) {
        return res.redirect("/"); // Chưa đăng nhập, chuyển hướng về trang chính
    }

    // Kiểm tra quyền hạn của người dùng
    if (req.session.user.permission !== 'A') {
        return res.status(403).send("Bạn không có quyền truy cập trang này!"); // Không phải admin
    }

    // Nếu là admin, tiếp tục xử lý
    next();
};


module.exports = { checkNotLoggedIn, checkLoggedIn, checkAdmin }