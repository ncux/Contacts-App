import React, { Fragment, useContext, useState, useEffect } from 'react';
import { ContactContext } from "../../contexts/contact";

export const FilterContacts = props => {

    const { contacts, setContacts, filteredContacts, filterContacts, clearFilteredContacts } = useContext(ContactContext);
    const [textInput, setTextInput] = useState('');

    useEffect(() => {
        if(!textInput.length) {
           setContacts(contacts);
        }
    }, [textInput]);

    const onTextInput = e => {
        setTextInput(e.target.value);
        if(textInput == '') {
            setContacts(contacts);
        }
        if(textInput != '') {
            filterContacts(textInput);
        }
    };

    return (
        <form className="">
            <input onChange={ onTextInput } placeholder="Search contacts" />
        </form>
    );

};

