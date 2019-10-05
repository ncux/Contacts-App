import React, { useState, useContext, useEffect } from 'react';
import {AlertContext} from "../../../contexts/alert";
import {AuthContext} from "../../../contexts/authentication";

export const Login = props => {

    const { setAlertMessage } = useContext(AlertContext);
    const { login, error, clearErrors, isAuthed } = useContext(AuthContext);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;

    useEffect(() => {
        if(error) {
            setAlertMessage('Invalid email or password. Try again.', 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error]);

    useEffect(() => {
        if(isAuthed) {
            props.history.push('/');
        }
    }, [isAuthed, props.history]);

    const onFormInput = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        if(email == '' || password == '') {
            setAlertMessage('Fill in all fields', 'danger');
        } else {
            login({ email, password });
        }
    };

    return (
        <div className="form-container">
            <h1><span className="text-primary">Login </span> now</h1>
            <form onSubmit={ onSubmit }>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={ email } name="email" onChange={ onFormInput } />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={ password } name="password" onChange={ onFormInput } />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    );
};

