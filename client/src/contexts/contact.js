import React, { createContext, useState } from 'react';
import axios from "axios";
import { httpHeaders } from "../config/axios";

export const ContactContext = createContext();

export const ContactsState = props => {

    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(true);

    const [contacts, setContacts] = useState(null);

    const [filteredContacts, setFilteredContacts] = useState(null);

    const [currentContact, setCurrentContact] = useState(null);

    const addContact = async newContact => {
        try {
            const res = await axios.post('/api/contacts/new', newContact, httpHeaders);
            console.log(res.data);
            setContacts([res.data.contact, ...contacts]);
            setLoading(false);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            console.log(res.data);
            setContacts(res.data.contacts);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    // sets contacts to an empty array or null after the use logs out
    const clearContacts = () => {
        setContacts(null);
        setFilteredContacts(null);
        setCurrentContact(null);
        setError(null);
    };

    const removeContact = async id => {
        try {
            if(window.confirm('Are you sure you want to delete this contact')) {
                const res = await axios.delete(`/api/contacts/delete/${id}`);
                console.log(res.data);
                let filteredContacts = contacts.filter(contact => contact._id !== id);
                setContacts([...filteredContacts]);
                setLoading(false);
                clearCurrent();
            }
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const setCurrentContactData = async contact => await setCurrentContact(contact);

    const clearCurrent = () => setCurrentContact(null);

    const updateContact = async (_id, fullname, email, phone, type) => {
        try {
            const updatedContact = { _id, fullname, email, phone, type };
            await axios.put(`/api/contacts/edit/${_id}`, { fullname, email, phone, type }, httpHeaders);
            const updatedContactList = contacts.map(contact => contact._id === _id ? updatedContact : contact);
            setContacts(updatedContactList);
            setLoading(false);
        } catch (err) {
            setError(err.message);
        }
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
            contacts,
            currentContact,
            setCurrentContactData,
            clearCurrent,
            addContact,
            getContacts,
            clearContacts,
            loading,
            removeContact,
            updateContact,
            filteredContacts,
            setContacts,
            filterContacts,
            clearFilteredContacts,
            error,
            setError
        }}>
            { props.children }
        </ContactContext.Provider>
    )
};


