import axios from "axios";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { ADD_TO_CART, DELETE_FROM_CART } from "../constants/cartConstants";
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from "../constants/messageConstants";
import { getLocalStorage, setLocalStorage } from "../../helpers/localStorage";

export const addToCart = (productId, productQty) => async (dispatch, getState) => {
    try {
        //! Check localStorage
        if (localStorage && !getLocalStorage("cart")) {
            //tạo cart
            await setLocalStorage("cart", []);
        }
        const response = await axios.get(`/api/product/${productId}`);
        console.log("actions/cartActions addToCart(id): ", response);
        //! add cart to Redux
        dispatch({
            type: ADD_TO_CART,
            payload: {...response.data, productQty },
        });

        //! set cart into localStorage
        setLocalStorage("cart", getState().cart.cartItems);
    } catch (error) {
        console.log(`ERROR get /api/product/:productId: `, error);
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: error.response.data.errorMessage,
        });
    }
};
