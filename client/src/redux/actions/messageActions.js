import * as actionTypes from "../constants/messageConstants"

export const clearMessages = () => (dispatch) => {
    //! this action call dispatch
    dispatch({
        type: actionTypes.CLEAR_MESSAGES,
    })
}

// function clear_messages() {
//     return function (dispatch) {};
// }