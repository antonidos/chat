import React, { FC, PropsWithChildren } from 'react';
import Header from 'widgets/Header';
import {Provider} from 'react-redux'
import { store } from 'entities/store';

const App:FC<PropsWithChildren> = (props) => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                </Provider> 
            <div className="app">
                <Header />
                {props.children}
            </div>
        </React.StrictMode>
    );
};

export default App;