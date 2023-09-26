import axios from "axios";
import { BASE_URL, TOKEN_CYB } from "../constants/api.js";
import { store } from "../store/config";

const request  = axios.create({
    baseURL: BASE_URL,
    headers: {
        TokenCybersoft: TOKEN_CYB,
        
    }
});

request.interceptors.request.use((config) => {
    const state = store.getState();

    let accessToken = null;

    if(state.userReducer.userInfo) {
        accessToken = state.userReducer.userInfo.accessToken;
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export { request };