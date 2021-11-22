import React from "react";

const CartItem = ({ match, cartItem }) => {
    //! HANDLE EVENT
    const getNameId = () => {
        const len = cartItem._id.length;
        const productNameId = cartItem._id.slice(len - 6, len).toUpperCase();
        return productNameId;
    };

    return (
        <div className="fcomp-shopping-item-card fcomp-cart__item">
            <div className="fcomp-shopping-item-card__media-wrap">
                <img src={`/uploads/${cartItem.fileName}`} alt="" className="fcomp-shopping-image" />
            </div>
            <div className="fcomp-shopping-item-card__header">
                <span className="fcomp-shopping-item-card__ref">{getNameId()}</span>
                <h2 className="fcomp-shopping-item-card__name">{cartItem.productName}</h2>
            </div>
            <div className="fcomp-shopping-item-card__actions">
                <div className="fcomp-shopping-item-card__actions-remove">XÓA</div>
                <div className="fcomp-shopping-item-card__actions-like fcomp-btn"><i className="fas fa-heart"></i></div>
            </div>
        </div>
    );
};

export default CartItem;
