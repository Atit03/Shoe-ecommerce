const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Không có token!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token không hợp lệ!" });
        }
        req.user = user; // Lưu thông tin người dùng vào req để sử dụng ở các route tiếp theo
        next();
    });
};
