import React from 'react';
import { ContactsList } from "../contacts/all-contacts";
import { NewContactForm } from "../contacts/new-contact-form";


export const Home = props => {

    return (
        <div className="grid-2">
            <div>
                <NewContactForm />
            </div>

            <div>
                <ContactsList />
            </div>
        </div>
    );

};

