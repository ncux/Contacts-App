import React, { useContext } from 'react';
import { ContactContext } from "../../contexts/contact";
import PropTypes from 'prop-types';

export const SingleContact = ({ contact }) => {

    const { _id, fullname, email, phone, type  } = contact;
    const { removeContact, setCurrentContactData } = useContext(ContactContext);

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                { fullname }{' '}
                <span style={{ float: 'right' }} className={ 'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary') }>
                    { type.charAt(0).toUpperCase() + type.slice(1) }
                </span>
            </h3>
            <ul className="list">
                { email && (<li><i className="fas fa-envelope-open"></i> { email }</li>) }
                { phone && (<li><i className="fas fa-phone"></i> { phone }</li>) }
            </ul>
            <p>
                <button onClick={ () => setCurrentContactData(contact) } className="btn btn-dark btn-sm">Edit</button>
                <button onClick={ () => removeContact(_id) } className="btn btn-danger btn-sm">Delete</button>
            </p>
        </div>
    );

};

SingleContact.propTypes = {
    contact: PropTypes.object.isRequired,
};
