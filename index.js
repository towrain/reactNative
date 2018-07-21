import React from 'react';
import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import Root from './src/navigator/switchNav';

// redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import thunk from 'redux-thunk';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
]);
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

// Amplify
import config from './src/aws-exports';
import Amplify from 'aws-amplify';
Amplify.configure(config);

// App
const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('hustlr', () => ReduxApp);
