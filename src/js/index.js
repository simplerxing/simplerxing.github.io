import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
//import { createStore } from 'redux';
import configureStore from './store/configureStore.js';
import Root from './containers/Root.js';

//action 来描述“发生了什么”，reducers 来根据 action 更新 state 。
//Store就是把他们联系到一起的对象。Redux 应用只有一个单一的 store

//维持应用的 state；
//提供 getState() 方法获取 state；
//提供 dispatch(action) 方法更新 state；
//通过 subscribe(listener) 注册监听器;
//通过 subscribe(listener) 返回的函数注销监听器。

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
//在Provider包围的范围内，通过 react-redux 提供的 connect() 方法将包装好的组件连接到Redux。
//传入组件需要的状态与action 生成函数。
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('container')
);