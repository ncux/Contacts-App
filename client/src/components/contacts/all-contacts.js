import React, { Fragment, useContext } from 'react';
import { ContactContext } from "../../contexts/contact/context";
import { SingleContact } from "./single-contact";


export const ContactsList = props => {

    const { contacts } = useContext(ContactContext);

    return contacts.length ? (
        <Fragment className="">
            <h2>Contacts</h2>
            <br />
            { contacts.map(contact => (
                    <SingleContact contact={ contact } key={contact.id} />
            )) }
        </Fragment>
    ) : (
        <div className="noBooks">
            <p>There are 0 contacts in your list. </p>
        </div>
    );

};

