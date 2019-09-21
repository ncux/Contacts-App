import React, { createContext, useState, useEffect } from 'react';
import uuid from 'uuid/v1';

export const ContactContext = createContext();

export const ContactsState = props => {

    const [contacts, setContacts] = useState([
        { id: 1, fullname: 'contact one', email: 'one@mail.com', phone: '111', type: 'personal' },
        { id: 2, fullname: 'contact two', email: 'two@mail.com', phone: '222', type: 'personal' },
        { id: 3, fullname: 'contact three', email: 'three@mail.com', phone: '333', type: 'professional' }
    ]);

    const [currentContact, setCurrentContact] = useState(null);

    const addContact = async (fullname, email, phone, type) => {
        const contactsList = [...contacts, { fullname, email, phone, type, id: uuid() }];
        setContacts(contactsList);
    };

    const removeContact = id => {
        let filteredContacts = contacts.filter(contact => contact.id !== id);
        setContacts([...filteredContacts]);
        clearCurrent();
    };

    const setCurrentContactData = async contact => {
        await setCurrentContact(contact);
        console.log(currentContact);
    };

    const clearCurrent = () => setCurrentContact(null);

    return (
        <ContactContext.Provider value={{ contacts, setCurrentContactData, addContact, removeContact }}>
            { props.children }
        </ContactContext.Provider>
    )
};


