import React, { useContext } from 'react';
import { ADD_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER } from "../actions";

export const ContactsReducer = (state, action) => {

    switch (action.type) {
        case ADD_CONTACT:
            action.contact.id = uuid();
            return [...state, action.contact ];
        case DELETE_CONTACT:
            return state.filter(contact => contact.id !== action.id);
        case SET_CURRENT:
            return { state: [...state], currentContact: action.contact };
        case CLEAR_CURRENT:
            return { state: [...state], currentContact: null };
        default:
            return state;
    }
};
