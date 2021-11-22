import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
//! helpers
import { showErrorMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { setAuthentication, isAuthenticated } from '../helpers/auth'; 
//! Client validator
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
//! API
import { signin } from '../api/auth';

const Signin = () => {
    //! create an Instance;
    let history = useHistory();
    //! when this Component run is will check this Authenticated 

    //! Check Authenticated after Component does Mount
    useEffect(() => {
        let isMounted = true; // note mutable flag
        if (isMounted && isAuthenticated() && isAuthenticated().role === 1) {
            //! Redirect to Admin dashboard
            history.push('/admin/dashboard');
        } else if (isMounted && isAuthenticated() && isAuthenticated().role === 0) {
            //! Redirect to User dashboard
            history.push('/user/dashboard');
        }
        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, [history]);


    const [formData, setFormData] = useState({
        username: "",
        email: "victhangnguyen@gmail.com",
        password: "123123",
        errorMsg: false,
        loading: false
    });
    

    //! Destructure state
    const { username, email, password, errorMsg, loading } = formData;

    const handleSubmit = (e) => {
        e.preventDefault();
        //! Client validation
        if (isEmpty(email) || isEmpty(password)) {
            setFormData({...formData, errorMsg: "Xin vui lòng nhập đủ thông tin người dùng"});
        } else if (!isEmail(email)) {
            setFormData({...formData, errorMsg: "Email không hợp lệ"});
        } else {
            //! Check validate success
            setFormData({...formData, loading: true});

            // Send data to server
            const data = { user : { email, password } };
            signin(data) //! return response
                .then(response => {
                    // console.log('token:', response.data.token); //! --useDebug
                    // console.log('user:', response.data.user); //! --useDebug

                    setAuthentication(response.data.token, response.data.user);
                    // console.log('localStorage user: ', localStorage.getItem('user'));

                    console.log('isAuthenticated: ', isAuthenticated());
                    console.log('isAuthenticated().role: ', isAuthenticated().role);
                    
                    if (isAuthenticated() && isAuthenticated().role === 1) {
                        //! Redirect to Admin dashboard
                        console.log('Redirect to Admin dashboard');
                        history.push('/admin/dashboard');
                    } else {
                        //! Redirect to User dashboard
                        console.log('Redirect to User dashboard');
                        history.push('/user/dashboard');
                    }

                    setFormData({
                        ...formData,
                        loading: false,
                    });
                })
                .catch(error => {
                    //! error -> Show error in Login
                    console.log('Sigin API function error: ', error);
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: error.response.data.errorMessage
                    });
                });
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            //! override by Computed Property Name
            [e.target.name]: e.target.value,
            errorMsg: ""
        });
    }

    // ******************************
    // * VIEW (Signin-Form)
    // ******************************
    
    const showSigninForm = () => (
        <form className="signin-form" onSubmit={handleSubmit} noValidate>
            <h4 className="d-flex justify-content-center mb-4">Đăng nhập</h4>
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
                    placeholder="Password"
                />
            </div>
            {/* submit */}
            <button type="submit" className="button btn-primary btn-block">Đăng nhập</button>
            <p className="forgot-password text-right" style={{color: 'white'}}>
                Bạn chưa có tài khoản?
                <Link to="/signup" className="ml-2">Đăng ký</Link>
                <Link to="/password" className="ml-2">Quên mật khẩu</Link>
            </p>
        </form>
    );

    return (
        <div className="signin-container">
            <div className="row px-4 vh-100">
                <div className="signin-form col-sm-8 col-md-6 mx-auto">
                {loading && (
                    <div className="text-center">
                        {showLoading()}
                    </div>
                    )
                }
                {errorMsg && showErrorMsg(errorMsg)}
                {showSigninForm()}
                </div>
            </div>
        </div>
    );
};

export default Signin;
