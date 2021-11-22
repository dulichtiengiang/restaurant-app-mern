import React, { useState, useEffect, Fragment } from "react";
//! helpers
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
//! validator
import isEmpty from "validator/lib/isEmpty";
//! Redux
import { useDispatch, useSelector } from "react-redux";
//! Redux - Actions
import { clearMessages } from "../redux/actions/messageActions";
import { createCategory, getCategories } from "../redux/actions/categoryActions";
//! Comp
import CategoryCard from "./CategoryCard";

const AdminCategoryModal = () => {
    // COMPONENT STATE PROPERTIES
    const dispatch = useDispatch();
    const [category, setCategory] = useState(""); //! Input category
    const [clientSideErrorMsg, setClientSideErrorMsg] = useState("");

    // ***********************************
    // * LIFECYCLE METHODS
    // ***********************************
    useEffect(() => { // Mình tự tạo
        dispatch(clearMessages());
        dispatch(getCategories());
    }, [dispatch]);

    // REDUX GLOBAL STATE PROPERTIES
    const { successMsg, errorMsg } = useSelector((state) => state.messages);
    const { loading } = useSelector((state) => state.loading);
    const { categories } = useSelector((state) => state.categories);

    // ******************************
    // * HANDLE EVENT
    // ******************************
    const handleMessages =  (evt) => {
        dispatch(clearMessages());
        setClientSideErrorMsg("");
    }

    const handleCategoryChange = (evt) => {
        setCategory(evt.target.value);
    };

    const handleCategorySubmit = (evt) => {
        evt.preventDefault();
        //! check validator
        if (isEmpty(category)) {
            setClientSideErrorMsg("Vui lòng nhập Thêm Phân loại");
        } else {
            //! Check validator Success
            const data = { category };
            //! api: /api/category/
            setCategory("");
            dispatch(createCategory(data));
        }
    };

    const handleCloseButton = () => {
        //! Reset Form
        setCategory("");
        dispatch(clearMessages());
    };

    return (
        <div id="addCategoryModal" className="modal fade">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Thêm loại</h5>
                        <button className="close btn-close" data-dismiss="modal" onClick={handleCloseButton}>
                            <span>
                                <i className="fas fa-times"></i>
                            </span>
                        </button>
                    </div>
                    <form action="" onSubmit={handleCategorySubmit}>
                        <div className="modal-body my-2">
                            {successMsg && showSuccessMsg(successMsg)}
                            {clientSideErrorMsg && showErrorMsg(clientSideErrorMsg)}
                            {errorMsg && showErrorMsg(errorMsg)}
                            {loading ? (
                                <div className="text-center">{showLoading()}</div>
                            ) : (
                                <Fragment>
                                    <label className="text-secondary" htmlFor="iptCategory">
                                        Loại
                                    </label>
                                    <input
                                        id="iptCategory"
                                        type="text"
                                        className="form-control"
                                        value={category}
                                        onChange={handleCategoryChange}
                                        onClick={handleMessages}
                                    />
                                </Fragment>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary btn-close" data-dismiss="modal" onClick={handleCloseButton}>
                                Đóng
                            </button>
                            <button type="submit" className="button btn-primary">
                                Thêm vào
                            </button>
                        </div>
                    </form>
                    <div className="modal-body__categories border-no">
                        {categories && categories.map((c, index) => <CategoryCard key={c._id} category={c} index={index} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCategoryModal;
