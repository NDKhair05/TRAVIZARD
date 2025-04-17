const connection = require("../config/database");
const bcrypt = require("bcrypt");
// const { use } = require("../routes/web");
const Swal = require('sweetalert2');
const { renderTour } = require("../services/tourService");


const postLogInUser = async (req, res) => {

    let loginEmail = req.body.loginEmail
    let loginPassword = req.body.loginPassword
    let loginName = req.body.loginName

    try {
        connection.query("SELECT * FROM Users WHERE email = ?", [loginEmail], async (err, results) => {
            const user = results[0];
            if (err) {
                return res.status(500).json({ status: 'error', message: 'Internal server error.' });
            } else

                if (results.length === 0) {
                    return res.status(400).json({ status: 'error_email', message: 'Email không hợp lệ' });
                } else

                    if (loginName != user.user_name) {
                        return res.status(400).json({ status: 'error_name', message: 'Tên đăng nhập không hợp lệ' });
                    } else

                        // const isMatch = await bcrypt.compare(loginPassword, user.password);
                        if (loginPassword != user.password) {
                            return res.status(400).json({ status: 'error_password', message: 'Mật khẩu không hợp lệ' });
                        }
                        else {
                            req.session.user = { id: user.user_id, name: user.user_name, email: user.email, tel: user.tel, permission: user.permission };
                            req.flash('success_msg', 'login')
                            return res.status(200).json({ status: 'success', message: 'Đăng nhập thành công' })
                        }


        });
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        res.status(500).send("Lỗi server.");
    }


};

const logOutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Logout failed.");
        }
        res.redirect("/");
    });
};

module.exports = {
    postLogInUser,
    logOutUser
};
