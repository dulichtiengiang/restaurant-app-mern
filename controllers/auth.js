const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");

const signupController = async (req, res) => {
    //! Destructure Incoming request user data
    const { username, email, password } = req.body.user;
    try {
        const user = await User.findOne({ email }); //! find one User whose 'email' with req, otherwise 'null' //! email : email
        //! check if email already registered.
        if (user) {
            console.log("Email đã được sử dụng");
            return res
                .status(400)
                .json({ errorMessage: "Email đã được sử dụng" });
        }

        //! generate Salt (with async await)
        const salt = await bcrypt.genSalt(10);
        //! hash password
        const hash_password = await bcrypt.hash(password, salt);
        //! create new User instance (model(Mongoose.schema) -> mongodb)
        const newUser = new User({ username, email, password: hash_password });
        //! Save User in Mongo database
        await newUser.save();
        //! send SuccessMessage to Signin
        res.json({
            successMessage: "Đăng ký tài khoản thành công, vào trang chủ",
        });
    } catch (error) {
        console.log("singupController errors: ", error);
        res.status(500).json({ errorMessage: "Server error" });
    }
};

const signinController = async (req, res) => {
    //! Destructure body Incoming request
    const { email, password } = req.body.user;
    try {
        const user = await User.findOne({ email });
        //! Check: User exist
        if (!user) {
            return res.status(400).json({ errorMessage: "Email không hợp lệ" });
        }
        //! Check: Compare password and hash_password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ errorMessage: "Email hoặc mật khẩu không đúng" });
        }

        //! [Login Success]
        // console.log("Đăng nhập thành công");
        //* payload
        const payload = { user: { _id: user._id } };

        //* create config folder w/ files (keys, dev, prod)
        //* jwt sign : 1.Pay load, 2. jwtSerect, 3.option is an object, 4. callback function alway do
        jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (error, token) => {
            if (error) console.log("jwt error: ", error);
            const { _id, username, email, role } = user;
            //! send back the response to the Client
            //* send res { token, user: { ... } }
            console.log("create a token: ", token);
            res.json({ token, user: { _id, username, email, role } });
        });
    } catch (error) {
        console.log("signinController error: ", error);
        res.status(500).json({ errorMessage: "Server error" });
    }
};

module.exports = {
    signupController,
    signinController,
};
