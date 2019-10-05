import React, { useContext, useEffect } from 'react';
import { ContactsList } from "../contacts/contacts-list";
import { ContactForm } from "../contacts/contact-form";
import { AuthContext } from "../../contexts/authentication";


export const Home = props => {

    const { loadCurrentUser, isAuthed } = useContext(AuthContext);

    useEffect(() => {
        loadCurrentUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>

            <div>
                <ContactsList />
            </div>
        </div>
    );

};

