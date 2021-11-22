import React from "react";

const NewProductModal = () => {
    return (
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
                <div className="modal-header bg-warning text-white">
                    <h5 className="modal-title">Tên sản phẩm</h5>
                    <button
                        className="close btn-close"
                        data-dismiss="modal"
                    ></button>
                </div>
                <div className="modal-body my-2"></div>
                <div className="modal-footer">
                    <button
                        className="btn btn-secondary btn-close"
                        data-dismiss="modal"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProductModal;
