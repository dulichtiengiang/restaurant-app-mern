//! constants
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//! Redux - actions
import { deleteProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const ProductCard = (props) => {
    const [productQty, setProductQty] = useState(1);
    //! React - Reduxt
    const dispatch = useDispatch();
    //! destructure product
    const { product, adminPage, homePage } = props;

    const showOptions = () => {
        if (product.productQty > 5) {
            return [...Array(5)].map((x, index) => (
                <option key={index + 11} value={index + 1}>
                    {index + 1}
                </option>
            ));
        } else {
            return [...Array(product.productQty)].map((x, index) => (
                <option key={index + 1} value={index + 1}>
                    {index + 1}
                </option>
            ));
        }
    };

    return (
        <div className="card">
            <Link to={`/product/${product._id}`}>
                <div className="card__img">
                    <img
                        className="image"
                        src={`/uploads/${product.fileName}`}
                        onError={(e) => {
                            e.target.src = `/uploads/no-img.png`;
                            e.target.onError = null;
                        }}
                        alt="product"
                    />
                </div>
            </Link>
            <div className="card__content">
                <div className="product">
                    <div className="product__name">
                        <h1>{product.productName}</h1>
                    </div>
                    <div className="product__price-rating">
                        <div className="product__price">
                            <h2>{product.productPrice.toLocaleString("vi-VN")} đ</h2>
                        </div>
                        <div className="product__rating">
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <div className="product__rating-number">
                                <h3>300</h3>
                            </div>
                        </div>
                    </div>
                    <div className="product-quantity">
                        <label htmlFor="product-quantity" className="form-label">Số lượng: </label>
                        <select className="form-control" name="product-quantity" id="product-quantity" onChange={(e) => setProductQty(e.target.value)}>
                            {showOptions()}
                        </select>
                    </div>
                    <div className="product__desc">
                        <p>{product.productDesc}</p>
                    </div>
                </div>
            </div>
            {adminPage && (
                <div className="card__controll">
                    <Link to={`/admin/edit/product/${product._id}`}>
                        <button className="button btn-primary">
                            <i className="far fa-edit pr-1"></i>
                            Edit
                        </button>
                    </Link>
                    <button className="button btn-secondary" onClick={() => dispatch(deleteProduct(product._id))}>
                        <i className="far fa-trash-alt"></i>
                        Delete
                    </button>
                </div>
            )}
            {homePage && (
                <div className="card__controll">
                    <Link to={`/product/${product._id}`}>
                        <button className="button button-primary-green" disabled={!product}>
                            Xem sản phẩm
                        </button>
                    </Link>
                    <button className="button button-primary-2" disabled={!product} onClick={() => dispatch(addToCart(product._id, productQty))}>
                        Thêm Giỏ hàng"
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
