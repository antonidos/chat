import React, { FC, PropsWithChildren } from 'react';
import Header from 'widgets/Header';
import { Provider } from 'react-redux'
import { store } from 'entities/store';

const App: FC<PropsWithChildren> = (props) => {

    return (
        <React.StrictMode>
            <Provider store={store}>
                <div className="app h-screen w-screen bg-primary dark:bg-slate-900">
                    <Header />
                    {props.children}
                </div>
            </Provider>
        </React.StrictMode>
    );
};

export default App;