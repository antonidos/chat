import Messenger from 'entities/Messenger';
import React from 'react';
import Header from 'widgets/Header';

const Index = () => {
    return (
        <React.StrictMode>
            <div className="app">
                <Header />
                <Messenger />
            </div>
        </React.StrictMode>
    );
};

export default Index;