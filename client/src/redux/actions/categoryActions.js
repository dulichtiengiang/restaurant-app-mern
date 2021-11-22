import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import {
    SHOW_ERROR_MESSAGE,
    SHOW_SUCCESS_MESSAGE,
} from "../constants/messageConstants";
import { GET_CATEGORIES, CREATE_CATEGORY, DELETE_CATEGORY } from "../constants/categoryContants";
import axios from "axios";

export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const response = await axios.get("/api/category");
        console.log(`RES categoryActions <- [GET] <- categoryController.readAll: `, response);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: GET_CATEGORIES, payload: response.data.categories });
    } catch (error) {
        //! error axios.get("/api/category")
        console.log(`ERROR categoryActions <- [GET] <- categoryController.readAll: `, error);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: error.response.data.errorMessage,
        });
    }
};

export const createCategory = (data) => async (dispatch) => {
    try {
        const config = { header: { "Content-Type": "application/json" } };
        dispatch({ type: START_LOADING });
        const response = await axios.post("/api/category", data, config); //! router.post("/", authenticateJWT, categoryController.create);
        dispatch({ type: STOP_LOADING });
        console.log(`RES categoryActions <- [POST] <- categoryController.create: `, response);
        //! payload is an object
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage,
        });
        dispatch({ type: CREATE_CATEGORY, payload: response.data.category });
    } catch (error) {
        console.log(`ERROR categoryActions <- [POST] <- categoryController.create: `, error);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: error.response.data.errorMessage,
        });
    }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
    try {
        // const config = { header: { "Content-Type": "application/json" } };
        dispatch({ type: START_LOADING });

        const response = await axios.delete(`/api/category/${categoryId}`);
        dispatch({ type: STOP_LOADING });
        console.log(`RES categoryActions <- categoryController.delete: `, response);
        //! payload is an object
        dispatch({ type: DELETE_CATEGORY, payload: response.data.oldCategory });
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage,
        });
    } catch (error) {
        console.log(`ERROR categoryActions <- categoryController.delete: `, error);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: error.response.data.errorMessage,
        });
    }
};