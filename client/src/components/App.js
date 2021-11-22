import "./App.css";
import "../css/main.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Route Component
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

//! Components
import Header from "./Header";
import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";
import Product from "./Product";
import Signin from "./Signin";
import Signup from "./Signup";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import AdminEditProduct from "./AdminEditProduct";
import CompTest from "./CompTest";
// import CompTest from "./CompTest";
import RippleButton from "./Button/RippleButton";
import NotFound from "./NotFound";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Switch>
                    <Route exact path="/test" component={CompTest} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/shop" component={Shop} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/product/:productId" component={Product} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/signin" component={Signin} />
                    <UserRoute
                        exact
                        path="/user/dashboard"
                        component={UserDashboard}
                    />
                    <AdminRoute
                        exact
                        path="/admin/dashboard"
                        component={AdminDashboard}
                    />
                    <AdminRoute
                        exact
                        path="/admin/edit/product/:productId"
                        component={AdminEditProduct}
                    />
                    <Route component={NotFound} />
                </Switch>
            </main>
        </BrowserRouter>
    );
};

export default App;
