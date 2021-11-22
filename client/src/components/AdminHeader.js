import React from "react";

const AdminHeader = () => {
    return (
        <div className="admin-header bg-dark text-white py-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="admin-header__title">
                            <i>Dashboard</i>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
