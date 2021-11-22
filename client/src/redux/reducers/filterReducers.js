//! Constants
import { GET_NEW_ARRIVALS } from "../constants/filterConstants";

const INITIAL_STATE = { newArrivals: [] };

const filterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_NEW_ARRIVALS:
            return { newArrivals: [...action.payload] }; //! payload = [{}, {}]

        default:
            return state;
    }
};

export default filterReducer;
