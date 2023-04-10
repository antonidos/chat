import React from 'react';
import Header from 'widgets/Header';
import Register from 'entities/Register';

const Authorization = () => {
    return (
        <React.StrictMode>
            <div className="app">
                <Header />
                <Register />
            </div>
        </React.StrictMode>
    );
};

export default Authorization;