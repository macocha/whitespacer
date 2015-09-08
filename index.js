import React from 'react';
import App from './containers/App';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import whitespaceDevStudio from './reducers/whitespaceDevReducer';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore);

const store = createStoreWithMiddleware(whitespaceDevStudio);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
);
