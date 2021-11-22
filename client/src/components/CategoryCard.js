import React from "react";
//! react-redux
import { useDispatch, useSelector } from "react-redux";
//! actions
import { deleteCategory } from "../redux/actions/categoryActions";
//dispacth



const CategoryCard = (props) => {
    //! react-redux
    const dispatch = useDispatch();
    const { category, index } = props;

    //! EVENT HANDLE
    const handleDeleteCategory = () => {
        console.log(`handleDeleteCategory`)
        dispatch(deleteCategory(category._id));
    }
    return (
        <div className="category-card">
            <div className="category-container">
                <div className="card-category border-no">
                    <div className="card-category__number">{index + 1}</div>
                    <div className="card-category__category">{category.category}</div>
                    <div className="card-category__controll">
                        <button className="btn-edit">Sửa tên</button>
                        <button className="btn-delete" onClick={handleDeleteCategory}>Xóa vĩnh viễn</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;
