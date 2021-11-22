import axios from "axios"
//! use async/await to API function
export const signup = async (data) => {
    const config = { header: { 'Content-Type': 'application/json' } };
    //! API
    const response = await axios.post('/api/auth/signup', data, config);
    return response;
}

export const signin = async (data) => {
    const config = { header: { 'Content-Type': 'application/json' } };
    //! API
    const response = await axios.post('/api/auth/signin', data, config)
    return response;
};