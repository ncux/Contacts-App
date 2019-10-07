import React, { Fragment, useContext, useEffect } from 'react';
import { ContactContext } from "../../contexts/contact";
import { SingleContact } from "./single-contact";
import { FilterContacts } from "./filter-contacts";
import { Loading } from "../layout/loading/loading";

export const ContactsList = props => {

    const { getContacts, loading, contacts, filteredContacts } = useContext(ContactContext);

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    if(contacts !== null && contacts.length === 0 && !loading) {
        return (
            <div className="text-center">
                <h5>There are no contacts in your list</h5>
            </div>
        )
    }

    return (
        <Fragment>

            <h2>Contacts</h2>
            <FilterContacts />
            { contacts !== null && !loading ? (
                 filteredContacts ? filteredContacts.map(contact => (
                        <Fragment key={contact._id}>
                            <SingleContact contact={ contact }  />
                        </Fragment>

                    )) : (
                        contacts.map(contact => (
                            <Fragment key={contact._id}>
                                <SingleContact contact={ contact }  />
                            </Fragment>
                        ))
                    )
            ) : (<Loading />) }

        </Fragment>
    );
};

