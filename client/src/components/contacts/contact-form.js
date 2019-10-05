import React, { useState, useContext, useEffect } from 'react';
import { ContactContext } from "../../contexts/contact";

export const ContactForm = props => {

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('personal');

    const { addContact, currentContact, clearCurrent, updateContact } = useContext(ContactContext);

    useEffect(() => {
        if(currentContact !== null) {
            setFullname(currentContact.fullname);
            setEmail(currentContact.email);
            setPhone(currentContact.phone);
            setType(currentContact.type);
        }
    }, [currentContact]);

    const onFormSubmit = e => {
        e.preventDefault();
        if(currentContact) {
            updateContact(currentContact.id, fullname, email, phone, type);
            clearForm();
        } else {
            addContact(fullname, email, phone, type);
            clearForm();
        }
    };

    const clearForm = () => {
      clearCurrent();
      setFullname('');
      setEmail('');
      setPhone('');
      setType('');
    };

    return (
        <form onSubmit={ onFormSubmit } className="">
            <h2 className="text-primary">{ currentContact ? 'Edit contact' : 'Add new contact' }</h2>
            <input value={ fullname } name="fullname" onChange={ e => setFullname(e.target.value) } placeholder="Full name" />
            <input type="email" value={ email } name="email" onChange={ e => setEmail(e.target.value) } placeholder="Email address" />
            <input value={ phone } name="phone" onChange={ e => setPhone(e.target.value) } placeholder="Phone number" />
            <h5>Contact type</h5>
            <input type="radio" value="personal"  name="type" onChange={ e => setType(e.target.value) } checked={ type === 'personal' } /> Personal { '  ' }
            <input type="radio" value="professional"  name="type" onChange={ e => setType(e.target.value) } checked={ type === 'professional' } /> Professional
            <div>
                <input value={ currentContact ? 'Save' : 'Add' } type="submit" className="btn btn-primary btn-block" />
            </div>
            { currentContact && <div><button onClick={ () => clearForm() } className="btn btn-light btn-block">Clear</button></div> }
        </form>
    );

};

