import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
//! Redux
import { useDispatch, useSelector } from "react-redux";
//! Redux - Actions
import { getProduct } from "../redux/actions/productActions";
import { getCategories } from "../redux/actions/categoryActions";
import { updateProduct } from "../redux/actions/productActions";
//! helpers
import { showLoading } from "../helpers/loading";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
//! Component
import AdminHeader from "./AdminHeader";

const AdminEditProduct = ({ match }) => {
    // ***********************************
    // * PARAMS
    // ***********************************
    const { productId } = match.params;

    const dispatch = useDispatch();

    //! COMPONENT STATE PROPERTIES
    const [productImage, setProductImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productQty, setProductQty] = useState("");

    //! REDUX GLOBAL STATE PROPERTIES
    const { errorMsg, successMsg } = useSelector((state) => state.messages);
    const { loading } = useSelector((state) => state.loading);
    const { product } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    
    // ***********************************
    // * LIFECYCLE METHODS
    // ***********************************
    //! dispatch getProduct(productId) within useEffect
    useEffect(() => {
        console.log("Effect run");
        if (!product) {
            dispatch(getProduct(productId));
            dispatch(getCategories());
        } else {
            setProductImage(product.fileName);
            setProductName(product.productName);
            setProductDesc(product.productDesc);
            setProductPrice(product.productPrice);
            setProductCategory(product.productCategory);
            setProductQty(product.productQty);
        }
    }, [dispatch, productId, product]);

    // ***********************************
    // * EVENT HANDLERS
    // ***********************************
    const handleProductSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productImage", productImage);
        formData.append("productName", productName);
        formData.append("productDesc", productDesc);
        formData.append("productPrice", productPrice);
        formData.append("productCategory", productCategory);
        formData.append("productQty", productQty);

        //! dispatch edit.
        dispatch(updateProduct(productId, formData));
    };
    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        setProductImage(image);
    };
    // ***********************************
    // * RENDERER
    // ***********************************
    return (
        <Fragment>
            <AdminHeader />
            <div className="admin-edit-product">
                <div className="container my-3">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <Link to="/admin/dashboard">
                                <span className="fas fa-arrow-left"> Go Back</span>
                            </Link>
                            <div>
                                <br />
                                <div className="modal-content">
                                    <form onSubmit={handleProductSubmit}>
                                        <div className="modal-header bg-success text-white">
                                            <h5 className="modal-title">Update Food</h5>
                                        </div>

                                        <div
                                            className="modal-body my-2"
                                            style={{
                                                height: "670px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            {loading ? (
                                                <div className="text-center">{showLoading()}</div>
                                            ) : (
                                                <Fragment>
                                                    <div className="admin-edit-body">
                                                        {errorMsg && <div className="mt-2">{showErrorMsg(errorMsg)}</div>}
                                                        {successMsg && <div className="mt-2">{showSuccessMsg(successMsg)}</div>}
                                                        <div
                                                            className="product-image"
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                gap: "50px",
                                                            }}
                                                        >
                                                            <div
                                                                className="card__image img-thumbnail"
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    width: "300px",
                                                                    height: "200px",
                                                                    overflow: "hidden",
                                                                }}
                                                            >
                                                                {productImage && productImage.name ? (
                                                                    <span className="badge badge-secondary">{productImage.name}</span>
                                                                ) : productName ? (
                                                                    <img
                                                                        className=""
                                                                        src={`/uploads/${productImage}`}
                                                                        alt={productName}
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            objectFit: "cover",
                                                                        }}
                                                                    />
                                                                ) : null}
                                                            </div>
                                                            <label className="btn btn-dark mr-4">
                                                                Choose file
                                                                <input
                                                                    type="file"
                                                                    name="productImage"
                                                                    accept="images/*"
                                                                    hidden
                                                                    onChange={handleImageUpload}
                                                                />
                                                            </label>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="text-secondary">Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="productName"
                                                                value={productName}
                                                                onChange={(e) => setProductName(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="text-secondary">Description</label>
                                                            <textarea
                                                                className="form-control"
                                                                rows="3"
                                                                name="productDesc"
                                                                value={productDesc}
                                                                onChange={(e) => setProductDesc(e.target.value)}
                                                            ></textarea>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="text-secondary">Price</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="productPrice"
                                                                value={productPrice}
                                                                onChange={(e) => setProductPrice(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-6">
                                                                <label className="text-secondary">Category</label>
                                                                <select
                                                                    className="custom-select mr-sm-2"
                                                                    name="productCategory"
                                                                    value={productCategory}
                                                                    onChange={(e) => setProductCategory(e.target.value)}
                                                                >
                                                                    <option value="">Choose one...</option>
                                                                    {categories &&
                                                                        categories.map((c) => (
                                                                            <option key={c._id} value={c._id}>
                                                                                {c.category}
                                                                            </option>
                                                                        ))}
                                                                </select>
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <label className="text-secondary">Quantity</label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    min="0"
                                                                    max="1000"
                                                                    name="productQty"
                                                                    value={productQty}
                                                                    onChange={(e) => setProductQty(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            )}
                                        </div>

                                        <div className="modal-footer" style={{ gap: "10px" }}>
                                            <button type="submit" className="btn btn-success text-white">
                                                Cập nhật
                                            </button>
                                            <Link to={"/admin/dashboard"}>
                                                <button className="btn btn-dark">Thoát</button>
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminEditProduct;
