import { GET_CATEGORIES, CREATE_CATEGORY, DELETE_CATEGORY } from "../constants/categoryContants";

const INITIAL_STATE = {
    //! server return array [{obj}, {obj}, {obj}, ...]
    categories: [],
};

const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state, //! initial_state
                categories: [...action.payload], // payload = [{ cateObj }, { cateObj }, ... ]
            };
        case CREATE_CATEGORY:
            return {
                ...state, //! initial_state
                categories: [...state.categories, action.payload], //! payload = { cateObj }
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories.filter(c => c._id !== action.payload._id)]
            }
        default:
            return state;
    }
};

export default categoryReducer;
