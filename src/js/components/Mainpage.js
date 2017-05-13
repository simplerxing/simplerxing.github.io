import React, { Component } from 'react';
//Link组件用于取代<a>元素，生成一个链接，允许
//用户点击后跳转到另一个路由。它基本上就是<a>元素的React 版本，可以接收Router的状态

//简单介绍一下NProgress，它包含了如下几个常用的方法：

//NProgress.start() — 显示加载条
//NProgress.set(0.4) — 设置加载的百分比
//NProgress.inc() — 增加一点儿
//NProgress.done() — 完成进度条

//import NProgress from 'nprogress';

class Mainpage extends Component {
	render() {
		return (
			<div className="article">
			<h1 className="article-title">Blog 进化史</h1>
			<div className="article-desc article-content">
			<p>为什么写博客？自己的博客记录自己所学、所想、所总结的技术。
			前段时间看到一句话挺有感触，“纸上得来终觉浅，绝知此事须躬行”，很有道理。
			出于兴趣爱好的目的构建这个独立博客，从2015年开始自己断断续续看些js相关的书籍，
			但一直没有实践，跟一位同学也经常聊天，就相关的内容进行讨论，最近一次聊天挺有感触，
			所以开始行动。</p>
			<p>以前所学的知识没有记录，没有总结，没有记录，过段时间便忘记。在寻找一些技术解决方案的时候，
			我一般会在搜索引擎搜索结果后优先去寻找别人的博客，因为里面更加容易找到我想要的答案。写博客的初衷
			就是为了实践一下，然后以后可以做笔记，完善知识内容。在博客园、开源中国等第三方博客网站可以写自己的技术博客。
			它们不需要你自己搭建网站，只需你提交博文即可，比较方便。但还是觉得自己写一个比较舒服。</p>
			<h2 id="-github-page">使用 github page</h2>
			<p>github page 是前段时间和同学聊天告诉我的，使用它可以定制自己的静态页面。可以使用 <strong>Hexo</strong>，
			因为搭建方便，缺点就是样式太大众化了。后来接触到了 <strong>jekyll</strong>，整个博客外观都可以自己定制，
			jekyll 博客每次要写一篇文章就要创建一个 markdown 文件，写完才能推送到 Github 上，
			而且换成另外一台电脑的话就要把源代码都下载下来，太麻烦了。</p>
			<h2 id="-github-api">使用 github api</h2>
			<p>在网上看到了有人使用 github page + github api + issues 来搭建自己的博客。
			使用 Github 的 issues 来写博客，然后通过 github api 来获取到 <strong>issue</strong> 显示在 github page 上，
			那 jekyll 博客的烦恼不就解决了。</p>
			<p>说干就干，花了几天的时间参考了别人的代码，写出了一个单页面的博客应用，虽然功能还不齐全，但已经够我个人使用的了。</p>
			<p>由于是非常白的小白，写的过程中同学帮了很多忙，在此非常感谢！</p>
			</div>
			</div>
			);
	}
};

export default Mainpage;
