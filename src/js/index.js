import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from './store/configureStore.js';
import Root from './containers/Root.js';

let store = configureStore();


render(
//<Provider store>

//Makes the Redux store available to the connect() calls in the component hierarchy below. Normally, 
//you can’t use connect() without wrapping a parent or ancestor component in <Provider>.

//If you really need to, you can manually pass store as a prop to every connect()ed component, 
//but we only recommend to do this for stubbing store in unit tests, or in non-fully-React codebases. 
//Normally, you should just use <Provider>.

//Props
//store (Redux Store): The single Redux store in your application.
//children (ReactElement) The root of your component hierarchy.
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('container')
);