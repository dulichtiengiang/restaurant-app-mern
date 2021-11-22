import React from "react";
//! react-redux
import { useDispatch, useSelector } from 'react-redux'
import CartItem from "./CartItem";
import RippleButton from "./Button/RippleButton";

const Cart = ({match, history}) => {
const { cartItems } = useSelector((state) => state.cart);
console.log(`cartItems: `, cartItems);
    return (
        <div className="fcomp-cart">
            <div className="fcomp-cart__primary">
                <div className="fcomp-cart__actions"></div>
                {cartItems.length === 0 ? (
                    <div className="jumbotron jumbotron-fluid " style={{ position: "relative", padding: "3rem 0" }}>
                        <button
                            className="btn-close"
                            style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #ffffff",
                                width: "4rem",
                                height: "4rem",
                            }}
                            onClick={() => history.goBack()}
                        >
                            <span style={{ fontSize: ".8rem" }}>Go back</span>
                        </button>
                        <div className="container">
                            <h3 className="">Chưa có sản phẩm nào</h3>
                            <p className="lead">
                                Hãy
                                <span style={{ fontWeight: "bold", color: "green" }}> [Thêm Giỏ Hàng] </span>
                                để lựa chọn những sản phẩm tốt nhất giành cho bạn. 
                            </p>
                        </div>
                        <RippleButton>Mua thêm sản phẩm</RippleButton>
                    </div>
                ) : null}
                <div className="fcomp-cart__head">
                    <h1 className="fcomp-cart__title"></h1>
                </div>
                <div className="fcomp-cart__cart-items">
                    {cartItems.map((cartItem, index) => (
                        <CartItem key={index} cartItem={cartItem} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cart;
