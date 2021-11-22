import React from "react";
import ProductCard from "./ProductCard";
//! Redux
import { useSelector } from "react-redux";
//! Redux - Actions

const AdminBody = () => {
    //! destructure state
    const { products } = useSelector((state) => state.products);
    return (
        <div className="admin-body">
            <div className="container-card">
                {products && products.map((product) => (<ProductCard product={product} key={product._id} adminPage={true}/>))}
                
            </div>
        </div>
    );
};

export default AdminBody;
