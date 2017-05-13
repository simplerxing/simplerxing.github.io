import React, { Component } from 'react';
//Link组件用于取代<a>元素，生成一个链接，允许
//用户点击后跳转到另一个路由。它基本上就是<a>元素的React 版本，可以接收Router的状态

//简单介绍一下NProgress，它包含了如下几个常用的方法：

//NProgress.start() — 显示加载条
//NProgress.set(0.4) — 设置加载的百分比
//NProgress.inc() — 增加一点儿
//NProgress.done() — 完成进度条

//import NProgress from 'nprogress';

class About extends Component {
	render() {
		return (
			<div className="article">
			<h2 className="category">这个人很懒</h2>
			<div className="article-desc article-content">
			<p>还没留下任何关于</p>
			</div>
			</div>
			);
	}
};

export default About;
