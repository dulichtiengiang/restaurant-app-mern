import React from "react";
import { Redirect, Route } from "react-router-dom";
//! import Condition
import { isAuthenticated } from "../helpers/auth";

//! composing Component with Route
const UserRoute = ({ component: Component, ...rest }) => {
    //! the component prop is assigned to the Component identifier
    //! the route component allows route props to be passed down in case you need them.
    return (
        <Route
            {...rest} //! props của UserRoute truyền xuống cho Route
            path="/user/dashboard"
            render={(props) =>
                isAuthenticated() && isAuthenticated().role === 0 ? ( //! props của Route truyền xuống cho Component
                    <Component {...props} />
                ) : (
                    <Redirect to="/signin" />
                )
            }
        />
    );
};

export default UserRoute;
