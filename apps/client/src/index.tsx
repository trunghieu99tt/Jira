import ReactDOM from 'react-dom';
import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ApolloProvider } from '@apollo/client/react';
import apolloClient from 'api/graphql-client';
import reportWebVitals from './reportWebVitals';

import AppProvider from '@context/app.context';

import { ToastContainer } from 'react-toastify';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import './i18.config';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <AppProvider>
          <RecoilRoot>
            <HelmetProvider>
              <ApolloProvider client={apolloClient}>
                <App />
                <ToastContainer />
              </ApolloProvider>
            </HelmetProvider>
          </RecoilRoot>
        </AppProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
