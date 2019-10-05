import React, { Fragment, useContext } from 'react';
import { ContactContext } from "../../contexts/contact";
import { SingleContact } from "./single-contact";
import { FilterContacts } from "./filter-contacts";

export const ContactsList = props => {

    const { contacts, filteredContacts } = useContext(ContactContext);

    if(!contacts.length) {
        return (
            <div className="text-center">
                <h5>There are no contacts in your list</h5>
            </div>
        )
    }

    return (
        <Fragment>
            { filteredContacts.length ? filteredContacts.map(contact => (
                <Fragment key={contact.id}>
                    <h2>Contacts</h2>
                    <FilterContacts />
                    <SingleContact contact={ contact }  />
                </Fragment>

            )) : (
                contacts.map(contact => (
                    <Fragment key={contact.id}>
                        <h2>Contacts</h2>
                        <FilterContacts />
                        <SingleContact contact={ contact }  />
                    </Fragment>
                ))
            ) }
        </Fragment>
    );
};

