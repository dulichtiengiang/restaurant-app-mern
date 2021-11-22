//! Reducers main
import * as actionTypes from "../constants/loadingConstants";
//! loadingConstants: START_LOADING, STOP_LOADING
const INITIAL_STATE = {
    loading: false,
};

//! Reducer sub
const loadingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.START_LOADING:
            return {
                loading: true,
            };

        case actionTypes.STOP_LOADING:
            return {
                loading: false,
            };
        default:
            return state;
    }
};

export default loadingReducer;
