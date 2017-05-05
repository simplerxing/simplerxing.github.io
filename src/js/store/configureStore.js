import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
//rootReducer就是../reducers/index.js中给出的postIssues接口,postIssues就是reducer
import rootReducer from '../reducers/index.js';

export default function configureStore(preloadedState) {
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