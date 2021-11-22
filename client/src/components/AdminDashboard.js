import React, { useState, useEffect } from "react";
// components
import AdminHeader from "./AdminHeader";
import AdminBody from "./AdminBody";
import AdminActionBtns from "./AdminActionBtns"
import AdminCategoryModal from "./AdminCategoryModal"
import AdminProductModal from "./AdminProductModal"

//! Redux
import { useDispatch } from "react-redux";
import { getCategories } from "../redux/actions/categoryActions";
import { getProducts } from "../redux/actions/productActions";

const AdminDashboard = () => {
    const dispatch = useDispatch();

    //! LIFECYCLE METHODS
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    
    return (
        <section className="admin-dashboard">
            <AdminHeader />
            <AdminActionBtns />
            <AdminBody />
            <AdminCategoryModal />
            <AdminProductModal />
        </section>
    );
};

export default AdminDashboard;
