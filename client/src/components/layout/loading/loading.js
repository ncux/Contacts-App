import React from 'react';
import loading from '../../../styles/loading.gif';

export const Loading = props => {

    return (
        <div>
            <img src={ loading } alt="...loading" style={{ width: '200px', margin: ' 40px auto', display: 'block' }}/>
        </div>
    )
};
