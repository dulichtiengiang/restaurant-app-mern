import { ADD_TO_CART, DELETE_FROM_CART, TOGGLE_CART } from "../constants/cartConstants";
import { getLocalStorage, setLocalStorage } from "../../helpers/localStorage";
const INITIAL_STATE = {
    cartItems: [],
};

if (localStorage && getLocalStorage("cart")) {
    INITIAL_STATE.cartItems = getLocalStorage("cart");
}


const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let product = action.payload;
            let existItem = state.cartItems.find((cartItem) => cartItem._id === product._id);
            if (existItem) {
                //! exist Item => dupplicated => override
                return {
                    ...state,
                    cartItems: [...state.cartItems.map((cartItem) => (cartItem._id === product._id ? product : cartItem))],
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, product],
                };
            }

        default:
            return state;
    }
};



export default cartReducer;
