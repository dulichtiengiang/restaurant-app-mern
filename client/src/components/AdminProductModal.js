import React, { useState, Fragment } from "react";
//! Component
import NewProductModal from "./NewProductModal";
//! helpers
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
//! validator
import isEmpty from "validator/lib/isEmpty";
//! Redux
import { useDispatch, useSelector } from "react-redux";
//! Redux - Actions
import { clearMessages } from "../redux/actions/messageActions";
import { createProduct } from "../redux/actions/productActions";

// ******************************
const AdminProductModal = () => {
    // ******************************
    // * REDUX GLOBAL STATE
    // ******************************
    //! destructure Global State
    const { successMsg, errorMsg } = useSelector((state) => state.messages);
    const { categories } = useSelector((state) => state.categories);
    const { loading } = useSelector((state) => state.loading);
    const dispatch = useDispatch();
    // ******************************
    // * COMPONENT STATE
    // ******************************
    const [clientSideErrorMsg, setClientSideErrorMsg] = useState("");
    const [productData, setProductData] = useState({
        productImage: null,
        productName: "",
        productDesc: "",
        productPrice: "",
        productCategory: "0",
        productQty: "1",
    });

    //! destructure productData
    const {
        productImage,
        productName,
        productDesc,
        productPrice,
        productCategory,
        productQty,
    } = productData;

    // ******************************
    // * HANDLE EVENT
    // ******************************
    const handleMessages = (evt) => {
        dispatch(clearMessages());
        setClientSideErrorMsg("");
    };

    const handleProductImage = (evt) => {
        setProductData({
            ...productData,
            [evt.target.name]: evt.target.files[0], //! with input  type="file"
        });
        // console.log(evt.target.files[0]);
        dispatch(clearMessages());
        setClientSideErrorMsg("");
    };

    const handleProductChange = (evt) => {
        setProductData({
            ...productData,
            [evt.target.name]: evt.target.value,
        });
        // dispatch(clearMessages());
        // setClientSideErrorMsg("");
    };

    const handleCloseButton = () => {
        dispatch(clearMessages());
        setClientSideErrorMsg("");
        //! Reset Form
        setProductData({
            productImage: null,
            productName: "",
            productDesc: "",
            productPrice: "",
            productCategory: "0",
            productQty: "1",
        });
    };

    const handleProductSubmit = (evt) => {
        evt.preventDefault();
        //! Reset Message
        dispatch(clearMessages());

        //! create Food
        if (productImage === null) {
            setClientSideErrorMsg("Vui lòng thêm hình ảnh món ăn");
        } else if (isEmpty(productName)) {
            setClientSideErrorMsg("Vui lòng nhập Tên món ăn");
        } else if (isEmpty(productDesc)) {
            setClientSideErrorMsg("Vui lòng nhập Mô tả món ăn");
        } else if (isEmpty(productPrice)) {
            setClientSideErrorMsg("Vui lòng nhập Giá");
        } else if (isEmpty(productCategory)) {
            setClientSideErrorMsg("Vui lòng Chọn loại");
        } else {
            console.log("Submit success");
            //! prep FormData Object
            //! built-in
            let formData = new FormData();
            formData.append("productImage", productImage); //! 1 - name of name field, 2 - value
            formData.append("productName", productName);
            formData.append("productDesc", productDesc);
            formData.append("productPrice", productPrice);
            formData.append("productCategory", productCategory);
            formData.append("productQty", productQty);
            //! create new Product
            dispatch(createProduct(formData));

            //! Reset Form
            setProductData({
                productImage: null,
                productName: "",
                productDesc: "",
                productPrice: "",
                productCategory: "0",
                productQty: "1",
            });
        }
    };

    return (
        <div id="addFoodModal" className="modal fade">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-warning text-white">
                        <h5 className="modal-title">Thêm món ăn</h5>
                        <button
                            onClick={handleCloseButton}
                            className="close btn-close"
                            data-dismiss="modal"
                            >
                            <span>
                                <i className="fas fa-times"></i>
                            </span>
                        </button>
                    </div>
                    <form action="" onSubmit={handleProductSubmit}>
                        <div className="modal-body my-2">
                            {successMsg && showSuccessMsg(successMsg)}
                            {clientSideErrorMsg &&
                                showErrorMsg(clientSideErrorMsg)}
                            {errorMsg && showErrorMsg(errorMsg)}
                            {loading ? (
                                <div className="text-center">
                                    {showLoading()}
                                </div>
                            ) : (
                                <Fragment>
                                    <div className="custom-file form-group mb-3">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            name="productImage"
                                            onChange={handleProductImage}
                                            onClick={handleMessages}
                                        />
                                        <label
                                            htmlFor="custom-file"
                                            className="custom-file-label"
                                        >
                                            Hình sản phẩm
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor="productName"
                                            className="text-secondary"
                                        >
                                            Tên sản phẩm
                                        </label>
                                        <input
                                            id="productName"
                                            type="text"
                                            className="form-control"
                                            name="productName"
                                            value={productName}
                                            onChange={handleProductChange}
                                            onClick={handleMessages}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor="productDesc"
                                            className="text-secondary"
                                        >
                                            Mô tả sản phẩm
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="productDesc"
                                            id="description"
                                            rows="2"
                                            value={productDesc}
                                            onChange={handleProductChange}
                                            onClick={handleMessages}
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor="productPrice"
                                            className="text-secondary"
                                        >
                                            Giá bán:
                                        </label>
                                        <input
                                            name="productPrice"
                                            id="productPrice"
                                            type="number"
                                            className="form-control"
                                            value={productPrice}
                                            onChange={handleProductChange}
                                            onClick={handleMessages}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-6">
                                            <label
                                                htmlFor="productCategory"
                                                className="text-secondary"
                                            >
                                                Loại:
                                            </label>
                                            <select
                                                id="productCategory"
                                                className="form-control custom-select mr-sm-5"
                                                name="productCategory"
                                                onChange={handleProductChange}
                                                onClick={handleMessages}
                                            >
                                                <option value="0">
                                                    Chọn loại...
                                                </option>
                                                {categories &&
                                                    categories.map((x) => (
                                                        <option
                                                            key={x._id}
                                                            value={x._id}
                                                        >
                                                            {x.category}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="form-group col-6">
                                            <label
                                                htmlFor="productQty"
                                                className="text-secondary"
                                            >
                                                Số lượng:
                                            </label>
                                            <input
                                                type="number"
                                                id="productQty"
                                                name="productQty"
                                                value={productQty}
                                                min="1"
                                                max="50"
                                                className="form-control"
                                                onChange={handleProductChange}
                                                onClick={handleMessages}
                                            />
                                        </div>
                                    </div>
                                </Fragment>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={handleCloseButton}
                                className="btn btn-secondary btn-close"
                                data-dismiss="modal"
                            >
                                Đóng
                            </button>
                            <button
                                type="submit"
                                className="btn btn-warning text-white"
                            >
                                Thêm món
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminProductModal;
