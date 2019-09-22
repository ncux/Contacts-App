import React from 'react';
import { ContactsList } from "../contacts/all-contacts";
import { ContactForm } from "../contacts/contact-form";


export const Home = props => {

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

