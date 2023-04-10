import PersonalInfo from 'entities/PersonalInfo';
import React from 'react';
import Header from 'widgets/Header';

const Personal = () => {
    return (
        <React.StrictMode>
            <div className="app">
                <Header />
                <PersonalInfo />
            </div>
        </React.StrictMode>
    );
};

export default Personal;