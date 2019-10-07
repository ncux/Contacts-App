import React, { useContext } from "react";
import { AlertContext } from "../../../contexts/alert";


export const Alert = props => {

    const { alertsState } = useContext(AlertContext);

    return (
        alertsState.length > 0 && alertsState.map(alert => (
            <div key={ alert.id } className={ `alert alert-${alert.type}` }>
                <i className="fas fa-info-circle"></i> { alert.message }
            </div>
        ))
    );

};

