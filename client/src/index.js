import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ReactModal from 'react-modal';
import App from './components/App.js';
import store from './store.js';

ReactModal.setAppElement('#root');

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('root') // eslint-disable-line no-undef
);

// #if process.env.NODE_ENV === "development"
module.hot.accept();
// #endif
