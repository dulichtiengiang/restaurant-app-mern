import { CREATE_PRODUCT, GET_PRODUCT, GET_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT } from "../constants/productConstants";

const INITIAL_STATE = {
    products: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
            }; //! payload = product {...}
        case GET_PRODUCTS:
            return {
                ...state,
                products: [...action.payload],
            }; //! payload = [ { prodObj }, { prodObj }, ...]
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((p) => p._id !== action.payload._id),
            }; //! payload = deletedProduct
        case UPDATE_PRODUCT:
            // console.log(`state.products: `, state.products);
            return {
                ...state,
                product: action.payload,
            };
        // products: state.products.map((p) =>
        // p._id === action.payload._id ? action.payload : p //! payload = product {...}
        // ),
        default:
            return state;
    }
};

export default productReducer;
