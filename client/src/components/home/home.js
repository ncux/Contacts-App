import React from 'react';
import { ContactsList } from "../contacts/all-contacts";


export const Home = props => {

    return (
        <div className="grid-2">
            <div>
                Form
            </div>

            <div>
                <ContactsList />
            </div>
        </div>
    );

};

