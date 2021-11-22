import axios from "axios";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import {
    SHOW_ERROR_MESSAGE,
    SHOW_SUCCESS_MESSAGE,
} from "../constants/messageConstants";
import {
    CREATE_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCTS,
    DELETE_PRODUCT,
    UPDATE_PRODUCT
} from "../constants/productConstants";

export const createProduct = (formData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.post("/api/product", formData);
        dispatch({ type: STOP_LOADING });
        console.log(`RES productActions <- [POST] <- productController.create: `, response);
        // create product
        dispatch({ type: CREATE_PRODUCT, payload: response.data.product });
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage,
        });
    } catch (error) {
        console.log(`ERROR productActions <- [POST] <- productController.create: `, error);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: error.response.data.errorMessage,
        });
    }
};

export const getProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get(`/api/product/${productId}`);
        console.log(`RES get /api/product/${productId}`, response);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: GET_PRODUCT, payload: response.data }); //! data = product
    } catch (error) {
        console.log(`ERROR productActions <- [GET] <- productController.read: `, error);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: error.response.data.errorMessage,
        });
    }
};
export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get("/api/product");
        console.log(`RES productActions <- [GET] <- productController.readAll: `, response);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: GET_PRODUCTS, payload: response.data.products });
    } catch (error) {
        console.log(`ERROR productActions <- [GET] <- productController.readAll: `, error);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: error.response.data.errorMessage,
        });
    }
};

//! create getProductsByCount action function
export const getProductsByCount = (count = 1) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get(`/api/product/count/${count}`);
        console.log(`RES productActions <- [GET] <- productController.readByCount: `, response);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: GET_PRODUCTS, payload: response.data.products });
    } catch (error) {
        console.log(`ERROR productActions <- [GET] <- productController.readByCount: `, error);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: error.response.data.errorMessage,
        });
    }
};

export const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        //! API request DELETE /api/product
        const response = await axios.delete(`/api/product/${productId}`);
        console.log(`RES productActions <- [delete] <- productController.delete ${productId}): `, response);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: DELETE_PRODUCT, payload: response.data }); //! data = deletedProduct
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage,
        });
    } catch (error) {
        console.log(`ERROR productActions <- [delete] <- productController.delete ${productId}): `, error);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: error.response.data.errorMessage,
        });
    }
};

export const updateProduct = (productId, formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    try {
        dispatch({ type: START_LOADING });
        //! response 1 product mới
        const response = await axios.post(
            `/api/product/${productId}`,
            formData
        );
        dispatch({ type: STOP_LOADING });
        console.log(`RES productActions <- [post] <- productController.update ${productId}): `, response);
        dispatch({ type: UPDATE_PRODUCT, payload: response.data.product }); //! data.product = editedProduct
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage,
        });
    } catch (error) {
        console.log(`ERROR productActions <- [post] <- productController.update ${productId}): `, error);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: error.response.data.errorMessage,
        });
    }
}
