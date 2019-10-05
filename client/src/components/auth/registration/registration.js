import React, { useState, useContext, useEffect } from 'react';
import { AlertContext } from "../../../contexts/alert";
import { AuthContext } from "../../../contexts/authentication";


export const Registration = props => {

    const { setAlertMessage } = useContext(AlertContext);
    const { register, error, clearErrors, isAuthed } = useContext(AuthContext);

    const [user, setUser] = useState({
        fullname: '',
        email: '',
        password: '',
        password2: ''
    });

    const { fullname, email, password, password2 } = user;

    const onFormInput = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();
      if(fullname == '' || email == '' || password == '') {
          setAlertMessage('Fill in all fields', 'danger');
      } else if(password != password2) {
          setAlertMessage('The passwords do not match', 'danger');
      } else {
          register({ fullname, email, password });
      }
    };

    useEffect(() => {
        if(error == 'Email already exists. Try logging in.') {
            setAlertMessage(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error]);

    useEffect(() => {
        if(isAuthed) {
            props.history.push('/');
        }
    }, [isAuthed, props.history]);

    return (
        <div className="form-container">
            <h1><span className="text-primary">Register </span> now</h1>
            <form onSubmit={ onSubmit }>
                <div className="form-group">
                    <label htmlFor="fullname">Full name</label>
                    <input type="text" value={ fullname } name="fullname" onChange={ onFormInput } />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={ email } name="email" onChange={ onFormInput } />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={ password } name="password" onChange={ onFormInput } />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Conform password</label>
                    <input type="password" value={ password2 } name="password2" onChange={ onFormInput } />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    );

};

