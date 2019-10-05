import React, { createContext, useState } from 'react';
import uuid from 'uuid/v1';

export const ContactContext = createContext();

export const ContactsState = props => {

    const [contacts, setContacts] = useState([
        { id: 1, fullname: 'contact one', email: 'one@live.com', phone: '111', type: 'personal' },
        { id: 2, fullname: 'contact two', email: 'two@gmail.com', phone: '222', type: 'personal' },
        { id: 3, fullname: 'contact three', email: 'three@yahoo.com', phone: '333', type: 'professional' }
    ]);

    const [filteredContacts, setFilteredContacts] = useState([]);

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

    const setCurrentContactData = async contact => await setCurrentContact(contact);

    const clearCurrent = () => setCurrentContact(null);

    const updateContact = async (id, fullname, email, phone, type) => {
        const updatedContact = { id, fullname, email, phone, type };
        const updatedContactList = contacts.map(contact => contact.id === id ? updatedContact : contact);
        setContacts(updatedContactList);
    };

    const filterContacts = textInput => {
        const regex = new RegExp(textInput, 'gi');
        const matchedContacts = contacts.filter(contact => {
            return contact.fullname.match(regex) || contact.email.match(regex) || contact.phone.match(regex);
        });
        setFilteredContacts(matchedContacts);
    };

    const clearFilteredContacts = () => setFilteredContacts([]);

    return (
        <ContactContext.Provider value={{
            contacts, currentContact, setCurrentContactData, clearCurrent, addContact, removeContact, updateContact, filteredContacts, setContacts, filterContacts, clearFilteredContacts
        }}>
            { props.children }
        </ContactContext.Provider>
    )
};


