const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

//! middleware routes
const authenticateJWT = (req, res, next) => {
    //! access to token
    //! npm install cookieParser => req.cookies
    const { token } = req.cookies; //! refs token in Cookies
    // console.log("authenticateJWT: ", token);

    //! check token
    if (!token) {
        return res.status(401).json({
            errorMessage: "No token, Authorization denied",
        });
    }

    //! verify a token symmetric - synchronous
    try {
        const decoded = jwt.verify(token, jwtSecret); //! verify return
        // console.log("decoded: ", decoded);
        // create an object user within request
        req.user = decoded.user;
        next();
    } catch (error) {
        console.log("jwt error: ", error);
        res.status(401).json({
            errorMessage: "Token không hợp lệ",
        });
    }
};

module.exports = {
    authenticateJWT,
};
