import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
//! import helpers
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading'
import { isAuthenticated } from '../helpers/auth';
//! import Validator
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
//! import API
import { signup } from '../api/auth';


const Signup = () => {
    //! create instance history hook.
    let history = useHistory();
        //! Check Authenticated after Component does Mount
    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().role === 1) {
            //! Redirect to Admin dashboard
            history.push('/admin/dashboard');
        } else if (isAuthenticated() && isAuthenticated().role === 0) {
            //! Redirect to User dashboard
            history.push('/user/dashboard');
        }
    }, [history]);

    const [formData, setFormData] = useState({
        username: "victhangnguyen",
        email: "victhangnguyen@gmail.com",
        password: "123123",
        password2: "123123",
        successMsg: false,
        errorMsg: false,
        loading: false
    });
    //! Destructure state
    const {username, email, password, password2, successMsg, errorMsg, loading} = formData;


    const handleSubmit = (e) => {
        e.preventDefault();
        //! client validation
        if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)) {
            setFormData({
                ...formData, errorMsg: "All fields are required" //! override ---> errorMsg  
            })
        } else if (!isEmail(email)) {
            setFormData({
                ...formData, errorMsg: "Invalid Email"
            })
        } else if (!equals(password, password2)) {
            setFormData({
                ...formData, errorMsg: "Passwords do not match"
            })
        } else {
            //! SUCCESS (Validation success)
            setFormData({
                ...formData, loading: true
            })
            
            // const { username, email, password } = formData;
            const data = { user : { username, email, password } };

            signup(data) //! renturn response
                .then(response => {
                    //! handle success
                    //! status(200)
                    console.log("axios res success: server -> client: ", response)
                    setFormData({
                        //! Reset Form
                        username: "",
                        email: "",
                        password: "",
                        password2: "",
                        //! Loading
                        loading: false,
                        //! SuccessMsg
                        successMsg: response.data.successMessage
                    }) //! --m1
                })
                .catch(error => {
                    //! handle error
                    //! status(400)
                    console.log('Sigup API function error: ', error);
                    // console.log('errorMessage: ', error.response.data.errorMessage)
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: error.response.data.errorMessage
                    });
                });
        }
        console.log(formData);
    }

    const handleChange = (e) => {
        // console.log(e)
    setFormData({
        ...formData, //! override
        [e.target.name]: e.target.value, //! Computed Property Name
        errorMsg: "",
        successMsg: ""
    })
    }
    // ******************************
    // * VIEW (Signup-Form)
    // ******************************
    const showSignupForm = () => (
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <h4 className="d-flex justify-content-center mb-4">Đăng ký tài khoản</h4>
            {/* username */}
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fa fa-user"></i>
                    </span>
                </div>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Username"
                />
            </div>
            {/* email */}
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fa fa-envelope"></i>
                    </span>
                </div>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Email address"
                />
            </div>
            {/* password */}
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fa fa-lock"></i>
                    </span>
                </div>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Create password"
                />
            </div>
            {/* confirm-password */}
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fa fa-lock"></i>
                    </span>
                </div>
                <input
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Confirm password"
                />
            </div>
            {/* submit */}
            <button type="submit" className="button btn-primary btn-block">Signup</button>
            <p className="forgot-password text-right" style={{color: 'white'}}>
                Already registered?
                <Link to="/signin" className="ml-2">Sign in</Link>
            </p>
        </form>
    );

    return (
        <div className="signup-container">
            <div className="row px-4 vh-100">
                <div className="signup-form col-sm-8 col-md-6 mx-auto">
                    {loading && (
                        <div className="text-center">
                            {showLoading()}
                        </div>
                        )
                    }
                    {errorMsg && showErrorMsg(errorMsg)}
                    {successMsg && showSuccessMsg(successMsg)}
                    {showSignupForm()}
                    <div className="useDebug">
                        {JSON.stringify(formData)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
