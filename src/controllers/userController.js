const connection = require("../config/database")


// const postCreateUser = (req, res) => {
//     console.log('>>>req.body: ', req.body)
//     let fullName = req.body.fullName
//     let tel = req.body.tel
//     let email = req.body.email
//     let password = req.body.password
//     let permisson = ''
//     if (req.body.fullName === 'ADMIN') {
//         permisson = 'A'
//     } else {
//         permisson = 'C'
//     }

//     connection.query(`SELECT * FROM Users WHERE email = ?`, [email], async (err, results) => {
//         if (results.length > 0) {
//             req.flash('invalid_email_msg', 'Email đã tồn tại')
//             return res.redirect('/register')
//         } else {
//             connection.query(
//                 `INSERT INTO Users(email, user_name, tel, password, permission)
//                 VALUES (?, ?, ?, ?, ?)`,
//                 [email, fullName, tel, password, permisson],
//                 (err, results) => {
//                     console.log(results)
//                 }
//             )

//             res.redirect('/login')
//         }
//     })

// }

const postCreateUser = (req, res) => {
    console.log('>>>req.body: ', req.body);
    let fullName = req.body.fullName;
    let tel = req.body.tel;
    let email = req.body.email;
    let password = req.body.password;
    let permisson = fullName === 'ADMIN' ? 'A' : 'C';

    connection.query(`SELECT * FROM Users WHERE email = ?`, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Internal server error' });
        }

        if (results.length > 0) {
            // Gửi thông báo flash qua JSON
            return res.status(400).json({ status: 'error', message: 'Email đã tồn tại' });
        } else {
            connection.query(
                `INSERT INTO Users(email, user_name, tel, password, permission)
                VALUES (?, ?, ?, ?, ?)`,
                [email, fullName, tel, password, permisson],
                (err, results) => {
                    if (err) {
                        return res.status(500).json({ status: 'error', message: 'Không thể tạo tài khoản' });
                    }
                    // Gửi thông báo thành công
                    return res.status(200).json({ status: 'success', message: 'Tài khoản đã được tạo thành công' });
                }
            );
        }
    });
};

module.exports = {
    postCreateUser
}