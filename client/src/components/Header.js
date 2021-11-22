import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
//! import helpers
import { logout, isAuthenticated } from "../helpers/auth";
import {getLocalStorage} from "../helpers/localStorage";
//! React - Redux
import { useDispatch, useSelector } from "react-redux";


const Header = ({ history }) => {
    console.log(`mount Header.js: `);
    //! State Component

    const { cartItems } = useSelector((state) => state.cart);
    //! Count Total: Items
    const cartSize =  cartItems.length;
    //! Count Total: Quantity of Products
    const totalQty = cartItems.reduce((totalQty, item) => totalQty + Number(item.productQty), 0);

    useEffect(() => {
        console.log(`mount Effect Header.js`);
    }, []);
    
    const handleLogout = () => {
        logout(() => {
            history.push("/signin");
        });
    };

    const showNavigation = () => (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand" >
                Shoes eCommerce
            </Link>
            <Link to="/cart" className="ml-auto mr-4">
                <button className="btn btn-light border">
                    <i className="fas fa-shopping-cart"></i>{" "}
                    {totalQty > 0 ? (
                        <span
                            className="badge badge-danger"
                            style={{
                                position: "absolute",
                                top: "6px",
                                display: "inline-block",
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                            }}
                        >
                            {totalQty}
                        </span>
                    ) : null}
                </button>
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <i className="fas fa-home"></i>{" "}
                            Trang chủ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop" className="nav-link">
                            <i className="fas fa-shopping-bag"></i>{" "}
                            Shop khuyến mãi
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link" style={{ position: "relative" }}>
                            <i className="fas fa-shopping-cart"></i>{" "}
                            Cart
                            {totalQty > 0 ? (
                                <span
                                    className="badge badge-danger"
                                    style={{
                                        position: "absolute",
                                        top: "6px",
                                        display: "inline-block",
                                        width: "18px",
                                        height: "18px",
                                        borderRadius: "50%",
                                    }}
                                >
                                    {totalQty}
                                </span>
                            ) : null}
                        </Link>
                    </li>
                    {/* Not Login */}
                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">
                                    Đăng ký
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link">
                                    Đăng nhập
                                </Link>
                            </li>
                        </Fragment>
                    )}
                    {/* User Header */}
                    {isAuthenticated() && isAuthenticated().role === 0 && (
                        <Fragment>
                            <li className="nav-item">
                                <Link to="/user/dashboard" className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                        </Fragment>
                    )}
                    {/* Admin Header */}
                    {isAuthenticated() && isAuthenticated().role === 1 && (
                        <Fragment>
                            <li className="nav-item">
                                <Link to="/admin/dashboard" className="nav-link">
                                    <i className="fas fa-table"></i>{" "}
                                    Dashboard
                                </Link>
                            </li>
                        </Fragment>
                    )}
                    {/* Logout / Signout */}
                    {isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <button className="btn btn-link" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i>{" "}
                                    Đăng xuất
                                </button>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </div>
        </nav>
    );

    return (
        <div className="header" id="header">
            {showNavigation()}
        </div>
    );
};

export default withRouter(Header);
