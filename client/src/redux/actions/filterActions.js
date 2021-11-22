import axios from "axios";
//! Constants
import { GET_NEW_ARRIVALS } from "../constants/filterConstants";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from "../constants/messageConstants";
import { GET_PRODUCTS } from "../constants/productConstants";

export const getNewArrivals =
    (sortBy = "desc", limit = "3") =>
    async (dispatch) => {
        try {
            dispatch({ type: START_LOADING });
            const response = await axios.get(`/api/filter?sortBy=${sortBy}&limit=${limit}`);
            dispatch({ type: STOP_LOADING });
            //! dispatch get New Arrivals BE:
            console.log(`RES filterActions <- [GET] <- filterController.getNewArrivals: `, response);
            dispatch({ type: GET_NEW_ARRIVALS, payload: response.data.newArrivals }); //!newArrivals = [{}, {}, {}...]
        } catch (error) {
            console.log(`ERROR filterActions <- [GET] <- filterController.getNewArrivals: `, error);
            dispatch({ type: STOP_LOADING });
            dispatch({
                type: SHOW_ERROR_MESSAGE,
                payload: error.response.data.errorMessage,
            });
        }
    };

export const getProductsByFilter = (arg) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/filter/search`, arg); //! arg = {}\
        
        console.log(`getProductsByFilter`, response);
        dispatch({ type: GET_PRODUCTS, payload: response.data.products });
    } catch (error) {
        console.log(`ERROR getProductsByFilter <- post.filterController: `);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: error.response.data.errorMessage });
    }
};