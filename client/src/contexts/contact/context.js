import React, { createContext, useReducer, useEffect } from 'react';
import { ContactsReducer } from './reducer';
import { ADD_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER } from "../actions";
import uuid from 'uuid/v1';

export const ContactContext = createContext();

export const ContactsState = props => {
    const state = [
            { id: 1, fullname: 'contact one', email: 'one@mail.com', phone: '111', type: 'personal' },
            { id: 2, fullname: 'contact two', email: 'two@mail.com', phone: '222', type: 'personal' },
            { id: 3, fullname: 'contact three', email: 'three@mail.com', phone: '333', type: 'professional' }
    ];

    const [contacts, dispatch] = useReducer(ContactsReducer, state);

    return (
        <ContactContext.Provider value={{ contacts, dispatch }}>
            { props.children }
        </ContactContext.Provider>
    )
};


