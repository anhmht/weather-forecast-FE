import axios from 'axios';

export const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key: string) => {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(localStorage.getItem(key)) : null;
}

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}

export const setAxiosHeader = (token) => {
    if (!token) {
        delete axios.defaults.headers.common["Authorization"];
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
