// import { combineReducers } from 'redux';
import objectAssign from 'object-assign';
//使用单独的模块或文件来定义 action type 常量并不是必须的，甚至根本不需要定义。
//对于小应用来说，使用字符串做 action type 更方便些。不过，在大型应用中把它们显式地定义成常量还是利大于弊的。
import { FETCH_ISSUES, RECEIVE_ISSUES } from '../constants/ActionTypes.js';
 //fetchIssues, receiveIssues是action,除了 type 字段外，action 对象的结构完全由你自己决定。
import { fetchIssues, receiveIssues } from '../actions/index.js';
//当调用异步 API 时，有两个非常关键的时刻：发起请求的时刻，和接收到响应的时刻（也可能是超时）。
//这两个时刻都可能会更改应用的 state；为此，你需要 dispatch 普通的同步 action。一般情况下，每个 API 请求都需要 dispatch 至少三种 action：
//一种通知 reducer 请求开始的 action。
//对于这种 action，reducer 可能会切换一下 state 中的 isFetching 标记。以此来告诉 UI 来显示加载界面。
//一种通知 reducer 请求成功的 action。
//对于这种 action，reducer 可能会把接收到的新数据合并到 state 中，并重置 isFetching。UI 则会隐藏加载界面，并显示接收到的数据。
//一种通知 reducer 请求失败的 action。
//对于这种 action，reducer 可能会重置 isFetching。另外，有些 reducer 会保存这些失败信息，并在 UI 里显示出来。

var defaultIssuesState = {
  isFetching: false,
  items: []
};

// issues reducer
function postIssues(defaultIssuesState, action) {
  switch (action.type) {
    case FETCH_ISSUES:
      // 获取issues
      return objectAssign({}, defaultIssuesState, {
        isFetching: true
      });

    case RECEIVE_ISSUES:
      //使用对象展开运算符Object.assign()
      // 接收issues
      return objectAssign({}, defaultIssuesState, {
        isFetching: false,
        items: action.posts
      });

    default:
      return defaultIssuesState;
  }
}

export default postIssues;

