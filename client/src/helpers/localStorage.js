export const setLocalStorage = (key, value) => {
    //! value JSON object, not Javascript object
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
    const value = JSON.parse(localStorage.getItem(key));
    return value;
};

export const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
};