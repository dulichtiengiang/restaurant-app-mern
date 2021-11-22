import * as actionTypes from "../constants/messageConstants";

const INITIAL_STATE = {
    //! initial State se bi override khi cac Case xay ra
    successMsg: "",
    errorMsg: "",
};

const messageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SHOW_SUCCESS_MESSAGE:
            return {
                ...state,
                successMsg: action.payload, //! action.payload.successMessage
            };
        case actionTypes.SHOW_ERROR_MESSAGE:
            return {
                ...state,
                errorMsg: action.payload,
            };
        case actionTypes.CLEAR_MESSAGES:
            return {
                successMsg: "",
                errorMsg: "",
            };
        default:
            return state;
    }
};

export default messageReducer;
