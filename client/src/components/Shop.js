import React, { useEffect, useState } from "react";
//! React Redux
import { useDispatch, useSelector } from "react-redux";
//! Actions
import { getProducts } from "../redux/actions/productActions";
import { getCategories } from "../redux/actions/categoryActions";
import { getProductsByFilter } from "../redux/actions/filterActions";
//! Components
import ProductCard from "./ProductCard";


const Shop = () => {
    // ***********************************
    // * COMPONENT STATE PROPERTIES
    // ***********************************
    const [text, setText] = useState("");
    const [categoryIds, setCategoryIds] = useState([]);
    // ***********************************
    // * REDUX GLOBAL STATE PROPERTIES
    // ***********************************
    const dispatch = useDispatch();


    // ***********************************
    // * __LIFECYCLE METHODS
    // ***********************************

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const { products } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);


    // ***********************************
    // * __EVENT HANDLE
    // ***********************************
    const handleSearch = (e) => {
        setText(e.target.value);
        console.log(`e.target.value: `, e.target.value);
        dispatch(getProductsByFilter({ type: "text", query: e.target.value }));
    }

    const handleFilterCategory = async e => {
        const id = e.target.value;
        const isChecked = e.target.checked;
        console.log(`id: `, id, `- checked: `, isChecked);
        let updatedCategoryids;
        if (isChecked) {
            //! Add Id into array
            updatedCategoryids = [...categoryIds, id];
            setCategoryIds(updatedCategoryids);
        } else {
            // Remove Id out of array
            updatedCategoryids = [...categoryIds.filter((cId) => cId !== id)];
            setCategoryIds(updatedCategoryids);
        }
        dispatch(getProductsByFilter({ type: "category", query: updatedCategoryids }));
        console.log(`current categoryIds array: `, updatedCategoryids);
    }


    return (
        <section className="shop-page">
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Shop</h1>
                    <p className="lead">Mua giày đẹp giao tận nơi và tham khảo thêm nhiều sản phẩm Giày Thể Thao/ Sneakers khác. Miễn phí vận chuyển toàn quốc cho mọi đơn hàng.</p>
                </div>
            </div>
            <div className="panel">
                <section className="panel__controll border-right">
                    <div className="box-filter">
                        <div className="filter-item">
                            <div className="filter-item__title">
                                <i className="fas fa-sliders-h"></i>{" "} Filter
                            </div>
                            <div className="filter-item__search">
                                <input type="search" name="search" className="search-tool" id="site-search" onChange={handleSearch} value={text} />
                            </div>
                            <div className="filter-item__categories border-botg">
                                <span className="title">Loại:</span>
                                {categories &&
                                    categories.map((c, index) => (
                                        <div className="comp-checkbox" key={index}>
                                            <input type="checkbox" name="category" id={`chk${c._id}`} value={c._id} onChange={handleFilterCategory} />
                                            <label htmlFor={`chk${c._id}`}>
                                                <svg viewBox="0 0 100 100">
                                                    <path
                                                        className="box"
                                                        d="M62.5,97.5h-45c-8.28,0-15-6.72-15-15v-45c0-8.28,6.72-15,15-15h45c8.28,0,15,6.72,15,15v45C77.5,90.78,70.78,97.5,62.5,97.5z"
                                                    />
                                                    <polyline className="check" points="92.5,21.67 35.83,78.33 7.5,50" />
                                                </svg>
                                                <span>{c.category}</span>
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
                <div className="panel__product">
                    <div className="panel-product-content">
                        <div className="container-card">
                            {products && products.map((p, index) => <ProductCard product={p} key={index} homePage={true} />)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Shop;