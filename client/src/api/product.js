import axios from "axios";

export const createProduct = async (data) => {
    const response = axios.post("/api/product", data);
    return response;
};
