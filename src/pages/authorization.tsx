import React from 'react';
import Header from 'widgets/Header';
import Auth from 'entities/Messenger';

const Authorization = () => {
    return (
        <React.StrictMode>
            <div className="app">
                <Header />
                <Auth />
            </div>
        </React.StrictMode>
    );
};

export default Authorization;