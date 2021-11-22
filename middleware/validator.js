const { check, validationResult  } = require('express-validator');

exports.signupValidator = [
    check('user.username', 'All fields required').not().isEmpty().trim(),
    check('user.email', 'Invalid email').isEmail().normalizeEmail(),
    check('user.password', 'Password must be at least 6 characters long').isLength({ min: 6 })
];

exports.signinValidator = [
    check('user.email', 'Vui lòng nhập email').not().isEmpty().trim(),
    check('user.email', 'Email không hợp lệ').isEmail().normalizeEmail(),
    check('user.password', 'Password must be at least 6 characters long').isLength({ min: 6 })
];

exports.validatorResult = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors) {
        // const firstError = result.array()[0].msg; //! --m1
        const firstError = result.array({ onlyFirstError: true })[0].msg; //! m2
        console.log('first Error: ', firstError); //! --m2-dbg
        console.log('hasErrors: ', hasErrors); //! --m1-dbg
        console.log('result: ', result); //! --m1-dbg
        
        return res.status(400).json({
            errorMessage: firstError
        })
    }

    next(); //! Next Function - Controller
};