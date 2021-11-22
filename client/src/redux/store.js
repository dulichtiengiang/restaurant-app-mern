import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
//! Reducers
import loadingReducer from "./reducers/loadingReducers";
import messageReducer from "./reducers/messageReducers";
import categoryReducer from "./reducers/categoryReducers";
import productReducer from "./reducers/productReducers";
import filterReducer from "./reducers/filterReducers";
import cartReducer from "./reducers/cartReducers";

//! arg-1-createStore: reducer (ReducersMapObject)
const reducer = combineReducers({
    loading: loadingReducer,
    messages: messageReducer,
    categories: categoryReducer,
    products: productReducer,
    filters: filterReducer,
    cart: cartReducer,
});

//! arg-2-createStore: initialState
const initialState = {}; //! by default it's gonna be an Empty object

//! arg-3-createStore: (enhancer) ...middleware)
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
