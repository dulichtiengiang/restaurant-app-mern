import React, { useEffect, useState } from "react";
//! react-redux
import { useDispatch, useSelector } from "react-redux";

//! actions
import { getProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const Product = (props) => {
    const [productQty, setProductQty] = useState(1);
    const { productId } = props.match.params;
    console.log(`productId`, productId);
    const dispatch = useDispatch();
    
    //! LIFECYCLE
    useEffect(() => {
        dispatch(getProduct(productId));
    }, [dispatch, productId]);
    
    //! REDUX GOLOBAL STATE PROPERTIES
    const { product } = useSelector((state) => state.products); //! lấy product từ server
    console.log(`product: `,product);
    const { cartItems } = useSelector((state) => state.cart);

    //! HANDLE EVENT
    const getNameId = () => {
        const len = productId.length;
        const productNameId = productId.slice(len - 6, len).toUpperCase();
        return productNameId;
    }

    const showOptions = () => {
        if (product) {
            return product.productQty > 5 ? [...Array(5)].map((x, index) => (
                <option key={index + 11} value={index + 1}>
                    {index + 1}
                </option>
            )) : [...Array(product.productQty)].map((x, index) => (
                <option key={index + 1} value={index + 1}>
                    {index + 1}
                </option>
            ))
        }
    };

    return (
        <div className="fcomp-product">
            <div className="fcomp-product__default">
                <div className="fcomp-product__wrap">
                    <div className="fcomp-product__primary">
                        <div className="fcomp-product__primary-wrap">
                            <div className="fcomp-product-visual">
                                <div className="fcomp-product-visual-module-desktop">
                                    <div className="fcomp-slider">
                                        <div className="fcomp-slider__container">
                                            <ul className="fcomp-slider__wrapper fcomp-list">
                                                <li className="fcomp-product-visual-module-mobile__slide fullwidth">
                                                    {product && <img src={`/uploads/${product.fileName}`} alt="" />}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="fcomp-slider fcomp-product-visual__module-thumbs">SLIDER HERE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fcomp-product__details">
                        <div className="fcomp-product__details-head">
                            <div className="fcomp-product__details-sku">
                                <h2>{getNameId()}</h2>
                            </div>
                            <div className="fcomp-product-wishlist">
                                <i className="fas fa-heart"></i>
                            </div>
                        </div>
                        <div className="fcomp-product__title fcomp-product-detail fcomp-product__title-h1">
                            <h1>HUNTER BITIS RED</h1>
                        </div>
                        <div className="fcomp-product__rating  fcomp-product-detail fcomp-h3">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <div className="fcomp-product-purchase fcomp-product-detail">
                            <div className="fcomp-product-purchase__price-stock fcomp-product-detail">
                                <div className="fcomp-product-purchase__price fcomp-product-price">
                                    {product && product.productPrice.toLocaleString("vi-VN")} đ
                                </div>
                                <div className="fcomp-product-purchase__stock fcomp-product-stock">
                                    {product && product.productQty > 0 ? `Còn hàng` : `Hàng đang về`}
                                </div>
                            </div>
                            <div className="fcomp-product-quantity fcomp-product-detail">
                                <label htmlFor="product-quantity" className="form-label">
                                    Số lượng:
                                </label>
                                <select
                                    className="form-control"
                                    name="product-quantity"
                                    id="product-quantity"
                                    onChange={(e) => setProductQty(e.target.value)}
                                >
                                    {showOptions()}
                                </select>
                            </div>
                            <button
                                className="fcomp-product-purchase__button btn btn-cart"
                                disabled={(product && product.productQty < 1) || !product}
                                onClick={() => product && dispatch(addToCart(product._id, productQty))}
                            >
                                Thêm Giỏ hàng
                            </button>
                            <div className="fcomp-product-purchase__description fcomp-h3">Sản phẩm này có khuyến mãi</div>
                        </div>
                        <button className="fcomp-product-loccate-in-store fcomp-product-detail btn btn-dark" disabled={!product}>
                            Tìm cửa hàng gần bạn
                        </button>
                        <div className="fcomp-product-description fcomp-product-detail">{product && product.productDesc}</div>
                    </div>
                </div>
                <div className="bg"></div>
            </div>
            <button className="btn btn-dark" onClick={() => props.history.goBack()}>
                Go back
            </button>
        </div>
    );
};

export default Product;
