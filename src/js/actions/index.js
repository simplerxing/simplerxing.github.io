//fetch 使用须知
//本示例使用了 fetch API。它是替代 XMLHttpRequest 用来发送网络请求的非常新的 API。由于目前大多数浏览器原生还不支持它，
//建议你使用 isomorphic-fetch 库：
// 每次使用 `fetch` 前都这样调用一下

//import fetch from 'isomorphic-fetch'
//在底层，它在浏览器端使用 whatwg-fetch polyfill，在服务器端使用 node-fetch，所以如果当你把应用改成 同构 时，并不需要改变 API 请求。

import fetch from 'isomorphic-fetch';
import { REQUEST_ISSUES, RECEIVE_ISSUES } from '../constants/ActionTypes.js';
import { CONFIG } from '../constants/Config.js';

//action创建函数,requestIssues和receiveIssues，返回一个action对象
// 获取issues
function requestIssues(filter, perPage) {
  return {
    type: REQUEST_ISSUES,
    filter,
    perPage
  };
}

// 接收issues
function receiveIssues(json) {
  return {
    type: RECEIVE_ISSUES,
    posts: json
  };
}

//服务端渲染须知

//异步 action 创建函数对于做服务端渲染非常方便。你可以创建一个 store，dispatch 一个异步 action 创建函数，
//这个 action 创建函数又 dispatch 另一个异步 action创建函数来为应用的一整块请求数据，同时在 Promise 完成
//和结束时才 render 界面。然后在 render 前，store 里就已经存在了需要用的 state。
//通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。这时，这个 action 创建函数就成为了 thunk

//不得不 dispatch 的 action 对象并非是一个样板代码，而是 Redux 的一个 基本设计选择
//以下为一个thunk函数

// thunk action creater
export function fetchIssues(filter, perPage) {

  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式传给函数，
  // 以此来让它自己也能 dispatch action

  return dispatch => {
    // 首次 dispatch：更新应用的 state 来通知
    // API 请求发起了。

    dispatch(requestIssues(filter, perPage));

    let url = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues`,
        href = `https://github.com/${CONFIG.owner}/${CONFIG.repo}/issues`;

    //#代表网页中的一个位置。其右面的字符，就是该位置的标识符。
    //比如，http://www.example.com/index.html#print就代表网页index.html的print位置。

    //？连接作用，清除缓存作用 

    //&不同参数的间隔符

    // 添加参数
    url += `?fliter=${filter}&per_page=${perPage}`;
    // thunk middleware 调用的函数可以有返回值，
    // 它会被当作 dispatch 方法的返回值传递。

    // 这个案例中，我们返回一个等待处理的 promise。
    // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。

    //从 fetch()返回的 Promise 将不会拒绝HTTP错误状态, 即使响应是一个 HTTP 404 或 500。
    //相反，它会正常解决 (其中ok状态设置为false),  并且仅在网络故障时或任何阻止请求完成时，它才会拒绝。
    //默认情况下, fetch在服务端不会发送或接收任何 cookies, 如果站点依赖于维护一个用户会话，
    //则导致未经认证的请求(要发送 cookies，必须发送凭据头).
    //promise.then(onCompleted, onRejected);
    //承诺必须完成（返回一个值）或者必须被拒绝（返回一个原因）。承诺完成或被拒绝时（无论哪一个先发生），
    //Promise 对象的 then 方法都会运行。如果承诺成功完成，
    //则将运行 then 方法的履行处理程序函数。如果承诺被拒绝，则将运行 then 方法（或 catch 方法）的错误处理程序函数。

    //这里我们通过网络获取一个jsonu对象并将其给receiveIssues函数。最简单的用法是只提供一个参数用来指明想
    //fetch到的资源路径url，然后返回一个包含响应结果的promise(一个 Response 对象)。

    //当然它只是一个 HTTP 响应，而不是真的需要的内容。为了获取内容，我们需要使用 receiveIssues() 方法
    return fetch(url)
      .then(response => response.json())
      .then(json => 
        dispatch(receiveIssues(json))
      )
      // 捕获网络请求的异常。
      .catch(e => {
        window.location.href = href;
      });
  };
}

function shouldFetchIssues(state) {
  if (!state) {
    return true;
  }

  return !state.items.length;
}

//每个帖子的列表都需要使用 isFetching 来显示进度条，didInvalidate 来标记数据是否过期，lastUpdated 来存放数据最后更新时间，
//还有 items 存放列表信息本身。在实际应用中，你还需要存放 fetchedPageCount 和 nextPageUrl 这样分页相关的 state

// 按需获取issues
export function fetchIssuesIfNeeded(filter, perPage) {
  // 当已经有issues的时候，则减少网络请求
  return function(dispatch, getState) {
    if ( shouldFetchIssues(getState()) ) {
      // 在 thunk 里 dispatch 另一个 thunk！
      return dispatch(fetchIssues(filter, perPage));
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve();
    }
  };
}












