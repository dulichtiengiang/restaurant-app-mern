import React from "react";

const AdminActionBtns = () => {
    return (
        <div className="bg-light">
            <div className="container">
                <div className="row py-3">
                    <div className="col-4 ">
                        <button
                            type="button"
                            data-toggle="modal"
                            data-target="#addCategoryModal"
                            className="btn btn-outline-primary btn-block"
                        >
                            <i className="fa-solid fa-plus"></i> Thêm loại
                        </button>
                    </div>
                    <div className="col-4">
                        <button
                            type="button"
                            data-toggle="modal"
                            data-target="#addFoodModal"
                            className="btn btn-outline-warning btn-block"
                        >
                            <i className="fa-solid fa-plus"></i> Thêm sản phẩm
                        </button>
                    </div>
                    <div className="col-4">
                        <button
                            type="button"
                            className="btn btn-outline-success btn-block"
                        >
                            <i className="fa-solid fa-money-check-dollar"></i>{" "}
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminActionBtns;
