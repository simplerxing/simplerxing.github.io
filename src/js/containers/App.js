import React, { Component } from 'react';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import { CONFIG } from '../constants/Config.js';


class App extends Component {
    constructor(props) {
        super(props);
        this.addBaiduAnaly = this.addBaiduAnaly.bind(this);
        //this.addDuoshuoComment = this.addDuoshuoComment.bind(this);
    }

    //componentWillMount会在组件render之前执行，并且永远都只执行一次
    // componentDidMount()这个方法会在组件加载完毕之后立即执行。在这个时候之后组件已经生成了对应的DOM结构，
    //可以通过this.getDOMNode()来进行访问

    componentDidMount() {
        // 添加百度统计
        this.addBaiduAnaly();

        // 添加多说评论框
        //this.addDuoshuoComment();

        document.title = CONFIG.title;

        if (!this.props.isFetching) {
            //简单介绍一下NProgress，它包含了如下几个常用的方法：

            //NProgress.start() — 显示加载条
            //NProgress.set(0.4) — 设置加载的百分比
            //NProgress.inc() — 增加一点儿
            //NProgress.done() — 完成进度条
            NProgress.done();
        }
    }

    //componentWillReceiveProps(object nextProps)
    //在组件接收到一个新的prop时被执行。并将其作为参数nextProps使用,这个方法在初始化render时不会被调用

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isFetching) {
            document.title = CONFIG.title;
            NProgress.done();
        }
    }

    addBaiduAnaly() {
        if (document.domain.indexOf('github.io') > -1) {
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement('script');
                hm.src = '//hm.baidu.com/hm.js?' + CONFIG['baiduAnaly'];
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(hm, s);
            })();
        }
    }

    /*--
  addDuoshuoComment() {
    window.duoshuoQuery = { short_name: CONFIG.duoshuo };
    (function() {
      var ds = document.createElement('script');
      ds.type = 'text/javascript';
      ds.async = true;
      ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
      ds.charset = 'UTF-8';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
  }
  --*/

    render() {
        return (
            <div>
            <nav className= "navbar navbar-default navbar-inverse">
            <div className="container-fluid">
            <div className="navbar-header">  
            <button type="button" className="navbar-toggle" data-toggle = "collapse"  data-target = "#target-menu">  
            <span className="sr-only"></span>  
            <span className="icon-bar"></span>  
            <span className="icon-bar"></span>  
            <span className="icon-bar"></span>
            </button> 
            <a className="navbar-brand" href="#/"><i className="fa fa-book fa-fw" aria-hidden="true"></i>&nbsp;Blog</a> 
            </div> 
            <div className="collapse navbar-collapse" id="target-menu">
            <ul className="nav navbar-nav">      
            <li><a href="#/"><i className="fa fa-home fa-fw"></i>&nbsp; 主页</a></li>
            <li><a href="#/all"><i className="fa fa-th fa-fw"></i>&nbsp; 全部</a></li>
            <li><a href="#/archive"><i className="fa fa-archive fa-fw"></i>&nbsp; 归档</a></li>
            <li><a href="#/tags"><i className="fa fa-tags fa-fw"></i>&nbsp; 标签</a></li>
            <li><a href="#/about"><i className="fa fa-user fa-fw"></i>&nbsp; 关于</a></li>
            </ul>
            </div>
            </div>
            </nav>
            <div>
            {this.props.children}
            </div>
            <footer className="footer">
            <div className="footer-inner">
            <div className="copyright">© 2015 - 2017&nbsp;&nbsp;<i className="fa fa-heart fa-fw"></i>&nbsp;&nbsp;SimplerXing</div>
            <div className="gitmail"><a href="https://github.com/simplerxing"><i className="fa fa-github fa-fw"></i>github</a></div>
            <div className="gitmail"><a href="mailto: simplerxing@gmail.com"><i className="fa fa-envelope fa-fw"></i>email</a></div>
            </div>
            </footer>
            </div>           
        );
    }
};
//使用 connect() 前，需要先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中。
function mapStateToProps(state) {
    const {
        isFetching,
        items
    } = state || {
        isFetching: true,
        items: []
    };

    return {
        isFetching,
        items
    }
}

//这样就可以在 App 这个组件里面通过 props 拿到 Store 的 dispatch 方法，但是注意现在的 App 没有监听
// Store 的状态更改，如果要监听 Store 的状态更改，必须要指定 mapStateToProps 参数

//[mapStateToProps(state, [ownProps]): stateProps]: 第一个可选参数是一个函数，只有指定了这个参数，
//这个关联（connected）组件才会监听 Redux Store 的更新，每次更新都会调用 mapStateToProps 这个函数，
//返回一个字面量对象将会合并到组件的 props 属性。 ownProps 是可选的第二个参数，它是传递给组件的 props，
//当组件获取到新的 props 时，ownProps 都会拿到这个值并且执行 mapStateToProps 这个函数

//[mapDispatchProps(dispatch, [ownProps]): dispatchProps]: 这个函数用来指定如何传递 dispatch 
//给组件，在这个函数里面直接 dispatch action creator，返回一个字面量对象将会合并到组件的 props 属性，
//这样关联组件可以直接通过 props 调用到 action， Redux 提供了一个 bindActionCreators() 辅助函数来
//简化这种写法。 如果省略这个参数，默认直接把 dispatch 作为 props 传入。ownProps 作用同上

export default connect(mapStateToProps)(App);
