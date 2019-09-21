import React, { useState, useContext } from 'react';
import { ContactContext } from "../../contexts/contact/context";

export const NewContactForm = props => {

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('personal');

    const { addContact } = useContext(ContactContext);

    const onFormSubmit = e => {
        e.preventDefault();
        addContact(fullname, email, phone, type);
        setFullname('');
        setEmail('');
        setPhone('');
        setType('');
    };

    return (
        <form onSubmit={ onFormSubmit } className="">
            <h2 className="text-primary">Add new contact</h2>
            <input value={ fullname } name="fullname" onChange={ e => setFullname(e.target.value) } placeholder="Full name" />
            <input type="email" value={ email } name="email" onChange={ e => setEmail(e.target.value) } placeholder="Email address" />
            <input value={ phone } name="phone" onChange={ e => setPhone(e.target.value) } placeholder="Phone number" />
            <h5>Contact type</h5>
            <input type="radio" value="personal"  name="type" onChange={ e => setType(e.target.value) } checked={ type === 'personal' } /> Personal { '  ' }
            <input type="radio" value="professional"  name="type" onChange={ e => setType(e.target.value) } checked={ type === 'professional' } /> Professional
            <div>
                <input value="Save" type="submit" className="tn btn-primary btn-block" />
            </div>
        </form>
    );

};

