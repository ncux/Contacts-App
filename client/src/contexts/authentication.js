import React, { createContext, useState } from 'react';
import axios from "axios";
import { httpHeaders } from "../config/axios";
import { setAuthToken } from "../config/httpInterceptor";

export const AuthContext = createContext();

export const AuthState = props => {

    const [token, setToken] = useState({ token: null });
    const [user, setUser] = useState(null);
    const [isAuthed, setIsAuthed] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // register user and get token
    const register = async formData => {
        try {
            const res = await axios.post(`/api/users/registration`, formData, httpHeaders);
            localStorage.setItem('token', res.data.token);
            setToken({ token: localStorage.getItem('token') });
            await loadCurrentUser();
        } catch (err) {
            console.log(err.response.data.message);
            localStorage.removeItem('token');
            setIsAuthed(false);
            setLoading(false);
            setUser(null);
            setError(err.response.data.message);
        }
    };

    // login user and get token
    const login = async formData => {
        try {
            const res = await axios.post(`/api/auth/login`, formData, httpHeaders);
            localStorage.setItem('token', res.data.token);
            setToken({ token: localStorage.getItem('token') });
            await loadCurrentUser();
        } catch (err) {
            console.log(err.response.data.message);
            localStorage.removeItem('token');
            setIsAuthed(false);
            setLoading(false);
            setUser(null);
            setError(err.response.data.message);
        }
    };

    // load currently authed user
    const loadCurrentUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
            try {
                const res = await axios.get(`/api/auth`);
                console.log(res.data);
                setIsAuthed(true);
                setLoading(false);
                setUser(res.data.user);
            } catch (err) {
                console.log(err.response.data.message);
                localStorage.removeItem('token');
                setIsAuthed(false);
                setLoading(false);
                setUser(null);
                setError(err.response.data.message);
            }
        }
    };

    // logout: destroys the token
    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthed(false);
        setLoading(false);
        setUser(null);
    };

    // clear errors
    const clearErrors = () => setError(null);


    return (
        <AuthContext.Provider value={{isAuthed, setIsAuthed, register, login, logout, clearErrors, loadCurrentUser, loading, setLoading, error, user, setUser}}>
            { props.children }
        </AuthContext.Provider>
    )

};
