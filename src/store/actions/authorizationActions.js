import {LOGIN, LOGOUT, FETCH_USER_INFO} from "./types";

import axios from 'axios';
import {returnErrors} from "./systemActions";

axios.interceptors.request.use(function (config) {
    config.headers.Authorization =  'Bearer ' + localStorage.getItem('access_token');

    return config;
});


export const logOut = () => dispatch => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    dispatch({
        type: LOGOUT,
    })
};


export const postUser = (data) => {
    const newUser = {
        'username': data.username,
        'email': data.email,
        'pwd': data.pwd,
        'full_name': data.full_name
    };
    axios
        .post('/api/profile', newUser)
        .then((res) => {
            console.log("res ", res);
        })
        .catch((err) => {
            alert(err.data);
        });
};


export const loginUser = (data) => dispatch => {
    const userData = {
        'login': data.login,
        'pwd': data.pwd
    };
    axios
        .post('/api/login', userData)
        .then((res) => {
            console.log("res ", res);
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            dispatch({
                type: LOGIN,
                payload: res.data
            })
        })
        .catch((err) => {
            alert(err.data);
            dispatch(returnErrors(err.data, err.status));
        });
};


export const refreshToken = (data) => {
    const tokenData = {
        'access_token': localStorage.getItem('refresh_token'),
        'refresh_token': localStorage.getItem('refresh_token')
    };
    axios
        .post('/api/sessions', tokenData)
        .then((res) => {
            console.log("res ", res);
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
        })
        .catch((err) => {
            console.log(err);
        });
};


export const getUserInfo = () => dispatch => {
    axios
        .get('/api/profile')
        .then((res) => {
            console.log("res ", res.data);
            dispatch({
                type: FETCH_USER_INFO,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err);
            dispatch(returnErrors(err.data, err.status));
        });
};