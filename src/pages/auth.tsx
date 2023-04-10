import React from 'react';
import Header from 'widgets/Header';

const Auth = () => {
    return (
        <React.StrictMode>
            <div className="app">
                <Header />
                <Auth />
            </div>
        </React.StrictMode>
    );
};

export default Auth;