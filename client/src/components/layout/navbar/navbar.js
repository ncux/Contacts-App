import React, { useContext, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from "../../../contexts/authentication";
import { ContactContext } from "../../../contexts/contact";

export const Navbar = ({ title, icon }) => {

    const { user, logout, isAuthed } = useContext(AuthContext);
    const { clearContacts } = useContext(ContactContext);

    const onLogout = () => {
        logout();
        clearContacts();
    };

    const isAuthedLinks = (
        <Fragment>
            <li>
                Hello { user && user.fullname }
            </li>
            <li>
                <a onClick={ onLogout } href="#">
                    <i className="fas fa-sign-out-alt"><span className="hide-sm"> Logout</span></i>
                </a>
            </li>
        </Fragment>
    );

    const isNotAuthedLinks = (
        <Fragment>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={ icon } /> { title }
            </h1>
            <ul>

                { isAuthed ? isAuthedLinks : isNotAuthedLinks }

                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/about">About</Link>
                </li>

            </ul>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: 'Contacts App',
    icon: 'fas fa-id-card-alt'
};



