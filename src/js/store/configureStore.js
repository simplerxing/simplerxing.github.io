import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
//rootReducer就是../reducers/index.js中给出的postIssues接口,postIssues就是reducer
//action 只是描述了有事情发生了这一事实，reducer根据action的描述怎么去更新状态。
//reducer就是一个纯函数，接收旧的state和action，返回新的state。使用函数默认值设置初始状态。
import rootReducer from '../reducers/index.js';

export default function configureStore(preloadedState) {
  //createStore() 的第一个参数就是reducer
	//createStore() 的第二个参数是可选的, 用于设置 state 初始状态。
	//createStore(reducer, [preloadedState], enhancer)
	//enhancer (Function): Store enhancer 是一个组合 store creator 的高阶函数，
	//返回一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变 store 接口
	//任何被发送到 store 的 action 都会经过thunkMiddleware
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware// 允许我们 dispatch() 函数
    )
  );
};