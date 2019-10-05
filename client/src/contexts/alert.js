import React, { createContext, useState } from 'react';
import uuid from 'uuid/v1';

export const AlertContext = createContext();

export const AlertState = props => {

    const [alertsState, setAlertsState] = useState([]);
   // const [alert, setAlert] = useState({ message: '', id: '' });

    // set alert message
    const setAlertMessage = (message, type, timeout=5000) => {
        alert.id = uuid();
        alert.message = message;
        alert.type = type;
        setAlertsState([...alertsState, alert]);

        setTimeout(removeAlertMessage, timeout)
    };

    const removeAlertMessage = id => {
        let filteredAlerts = alertsState.filter(alert => alert.id !== id);
        setAlertsState([...filteredAlerts]);
    };

    return (
        <AlertContext.Provider value={{setAlertMessage, removeAlertMessage, alertsState, setAlertsState}}>
            { props.children }
        </AlertContext.Provider>
    )

};
