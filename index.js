import React from 'react';
import App from './containers/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import whitespaceDevStudio from './reducers/whitespaceDevReducer';

const store = createStore(whitespaceDevStudio);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
);
