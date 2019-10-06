import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/authentication";


export const AuthGuard = ({ component: Component, ...rest }) => {

    const { isAuthed, loading } = useContext(AuthContext);

    return (
        <Route { ...rest } render={ props => isAuthed && !loading ? (
            <Component { ...props } />
        ) : (
            <Redirect to="/login" />
        ) } />
    );

};

