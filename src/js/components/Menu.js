import React, { Component } from 'react';
//Link组件用于取代<a>元素，生成一个链接，允许
//用户点击后跳转到另一个路由。它基本上就是<a>元素的React 版本，可以接收Router的状态

import { Link } from 'react-router';

//简单介绍一下NProgress，它包含了如下几个常用的方法：

//NProgress.start() — 显示加载条
//NProgress.set(0.4) — 设置加载的百分比
//NProgress.inc() — 增加一点儿
//NProgress.done() — 完成进度条

//import NProgress from 'nprogress';

class Menu extends Component {
  render() {
    return (
      <div id="home">
        <div className="avatar">
          <a href="https://github.com/simplerxing"></a>
        </div>
        <h1>simplerxing</h1>
        <div className="link">
          <Link to="all">全部</Link>
          <Link to="archive">归档</Link>
          <Link to="tags">标签</Link>
        </div>
      </div>
    );
  }
};

export default Menu;