import React from "react";
import { Route, Redirect } from "react-router";
import { isAuthenticated } from "../helpers/auth";
//! any structure components
//! the [props] object has a  property called [component]
//! we assign it to a variable called [Compoenent]
//! viet gon ({component, ...rest})
//! ...rest spread out the props property but assign it to a variable were calling rest
//! component right, and ... is left, so component, reassign it to a variable called rest#
//!
const AdminRoute = ({ component: Component, ...rest }) => {
    console.log("rest: ", rest);
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated() && isAuthenticated().role === 1 ? ( //! condition Check Route
                    <Component {...props} /> //! then display our Custom Component with the spread props
                ) : (
                    <Redirect to="/signin" />
                )
            }
        />
    );
};

export default AdminRoute;
