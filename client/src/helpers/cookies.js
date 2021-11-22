import Cookies from 'js-cookie';

export const setCookie = (key, value) => {
    Cookies.set(key, value, { expires: 1 });
}

export const getCookie = (key) => {
    const value = Cookies.get(key);
    return value;
}

export const deleteCookie = (key) => {
    Cookies.remove(key);
}