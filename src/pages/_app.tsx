import '../app/index.css'
import 'react-toastify/dist/ReactToastify.css';
import { AppProps } from 'next/app';
import { Flip, ToastContainer } from 'react-toastify';
import { getSettings, setTheme } from 'widgets/Header/api/apiSettings';
import { useRouter } from 'next/router';
import { Provider, useDispatch } from 'react-redux';
import { setIsLoggedIn, setPersonalInfo } from 'entities/slices/user/userSlice';
import { getUserInfo } from 'entities/PersonalInfo/api/personalDataApi';
import React, { useEffect } from 'react';
import { store } from 'entities/store';

// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }: AppProps) {

  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-left"
          hideProgressBar
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Flip}
        />
      </Provider>
    </React.StrictMode>

  );
}