const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký người dùng
exports.registerUser = async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi đăng ký người dùng." });
    }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Người dùng không tồn tại!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không đúng!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            token,
            user: { id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi đăng nhập." });
    }
};

// Lấy thông tin người dùng
exports.getUserDetails = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).select('-password'); // Không trả về mật khẩu
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng." });
    }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
    const userId = req.user.id;
    const { firstname, lastname, username, email, phone, gender } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstname, lastname, username, email, phone, gender },
            { new: true, runValidators: true }
        ).select('-password'); // Không trả về mật khẩu

        if (!updatedUser) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật thông tin người dùng." });
    }
};
