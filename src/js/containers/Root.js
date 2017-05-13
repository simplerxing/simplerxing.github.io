import React, { Component } from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { CONFIG } from '../constants/Config.js';
import NProgress from 'nprogress';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

import Mainpage from '../components/Mainpage.js';
import App from '../containers/App.js';
import About from '../components/About.js';


import '../../css/article.scss';
import '../../css/main.scss';
import '../../css/reset.scss';
import '../../css/fonts.scss';
//import '../../css/index.scss';
import '../../css/list.scss';
import '../../css/nprogress.scss';

//React Router 是建立在 history 之上的。 简而言之，一个 history 知道如何去监听浏览器地址栏的变化， 
//并解析这个 URL 转化为 location 对象， 然后 router 使用它匹配到路由，最后正确地渲染对应的组件。

/*setTimeout(function(){


  //<iframe> 标签规定一个内联框架。
  //一个内联框架被用来在当前 HTML 文档中嵌入另一个文档
  //利用iframe的onload事件刷新页面
  document.title = CONFIG.title;
  var iframe = document.createElement('iframe');
  iframe.style.visibility = 'hidden';
  iframe.style.width = '1px';
  iframe.style.height = '1px';
  iframe.onload = function () {
    setTimeout(function () {
      document.body.removeChild(iframe);
    }, 0);
  };
  document.body.appendChild(iframe);
},0);*/


//如果你想要进一步个性化你的history选项，或者使用其他方式去增强你的history，你可以使用useRouterHistory
//Hash history 使用 URL 中的 hash（#）部分去创建形如 example.com/#/some/path 的路由

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

var All = (location, callback) => {
  document.title = CONFIG.titleLoad;
  NProgress.start();

  //Webpack 提供了很多方式去让我们设置分块点。但最有用的一个就是 require.ensure方法
  //require.ensure方法的第三个参数是指定模块名称。它是一个可选项，如果不填，将会自动生成一个 ID作为文件名。

  require.ensure([], require => {
    callback(null, require('../containers/All.js').default);
  }, 'all');
};

var Archive = (location, callback) => {
  document.title = CONFIG.titleLoad;
  NProgress.start();
  require.ensure([], require => {
    callback(null, require('../containers/Archive.js').default);
  }, 'archive');
};

var Tags = (location, callback) => {
  document.title = CONFIG.titleLoad;
  NProgress.start();
  require.ensure([], require => {
    callback(null, require('../containers/Tags.js').default);
  }, 'tags');
};

var Post = (location, callback) => {
  document.title = CONFIG.titleLoad;
  NProgress.start();
  require.ensure([], require => {
    callback(null, require('../containers/Post.js').default);
  }, 'post');
};

//The <Router> tag should always be the primary parent tag that wraps the multiple URLs
//with the <Route> tag. We can declare multiple <Route> tags with attribute components
//that make your UI in-sync. When the history changes, the <Router> will render the
//component with the matching URL
//使用 IndexRoute 来设置一个默认页面

//react-router的 <Route>标签有一个叫做getComponent的异步的方法去获取组件。他是一个
//function接受两个参数，分别是location和callback。当react-router执行回调函数
// callback(null, ourComponent)时，路由只渲染ourComponent组件

const routes = (
  <Route path="/" component={App}>
    //当 url 为/时渲染 Dashboard 
    <IndexRoute component={Mainpage} />
    <Route path="/about" component={About} />
    <Route path="/all" getComponent={All} />
    <Route path="/archive" getComponent={Archive} />
    <Route path="/tags" getComponent={Tags} />
    <Route path="/post/:id" getComponent={Post} />  
  </Route>
);

export default class Root extends Component {
  render() {
    return <Router history={appHistory} routes={routes} />
  }
};
