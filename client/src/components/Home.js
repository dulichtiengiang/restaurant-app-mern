import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
//! helpers
import { showLoading } from "../helpers/loading";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
//! Redux
import { useDispatch, useSelector } from "react-redux";
//! Redux - Actions
import { getNewArrivals } from "../redux/actions/filterActions";
import { getProducts, getProductsByCount } from "../redux/actions/productActions";
//! Component
import ProductCard from "./ProductCard";
import RippleButton from "./Button/RippleButton";

const Home = () => {
    const dispatch = useDispatch();

    // ***********************************
    // * LIFECYCLE METHODS
    // ***********************************
    useEffect(() => {
        dispatch(getNewArrivals());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProductsByCount(7));
    }, [dispatch]);

    // REDUX GLOBAL STATE PROPERTIES
    const { errorMsg, successMsg } = useSelector((state) => state.messages);
    const { loading } = useSelector((state) => state.loading);
    const { newArrivals } = useSelector((state) => state.filters);
    const { products } = useSelector((state) => state.products);

    // const listHotProduct = () => {
    //     const size = 6;
    //     const listProduct = products.slice(0, size).map((p, index) => <ProductCard product={p} key={index} homePage={true} />);
    //     return listProduct;
    // }

    return (
        <section className="home-page">
            <div className="home-page__banner banner-image">
                <img src="../assets/images/banner.jpg" alt="../assets/images/banner.jpg" />
            </div>
            <div className="home-page__body">
                {loading ? (
                    showLoading()
                ) : (
                    <div className="page-content">
                        <div className="item-infos">
                            <div className="item-title title-with-level">
                                <span className="multiline-text">SẢN PHẨM MỚI</span>
                            </div>
                            <div className="item-content">
                                <div className="container-card">
                                    {newArrivals && newArrivals.map((p, index) => <ProductCard product={p} key={index} homePage={true} />)}
                                </div>
                            </div>
                        </div>
                        <hr className="my-5" />
                        <div className="item-infos">
                            <div className="item-title title-with-level">
                                <span className="multiline-text">SẢN PHẨM BÁN CHẠY</span>
                            </div>
                            <div className="item-content">
                                <div className="container-card">
                                    {/* {products && listHotProduct()} */}
                                    {products && products.map((p, index) => <ProductCard product={p} key={index} homePage={true} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home;
