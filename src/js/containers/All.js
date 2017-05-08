import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIssuesIfNeeded } from '../actions/index.js';
import CellView from '../components/CellView.js';

class All extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchIssuesIfNeeded('created', 10000));
  }

  render() {
    if (this.props.isFetching) {
      return null;
    }

    return (
      <div className="list">
        <CellView title="全部" items={this.props.items} />
      </div>
    );
  }
};

//[mapStateToProps(state, [ownProps]): stateProps] (Function): If this argument is specified, the new component
// will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. 
//The results of mapStateToProps must be a plain object*, which will be merged into the component’s props. 
//If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps. 
//If ownProps is specified as a second argument, its value will be the props passed to your component, 
//and mapStateToProps will be additionally re-invoked whenever the component receives new props
//(e.g. if props received from a parent component have shallowly changed, and you use the ownProps argument, 
//mapStateToProps is re-evaluated).

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

//建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。
//connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
//Connects a React component to a Redux store
//使用 connect() 前，需要先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中,
//这个函数允许我们将 store 中的数据作为 props 绑定到组件上
//connect后面第二个括号是要添加prop的react组件，第一个括号中的参数是用来改变该组件prop的方法，第一个括号有两个参数，
//第一个参数是一个函数，返回一个对象，对象的键是该组件的prop属性，值是该prop的值；第二个参数也是一个函数，返回一个对象，
//对象的键同样是prop的属性名，值是一个redux的dispatch，当这个prop属性被用于触发时，dispatch会改变redux中state的值
export default connect(mapStateToProps)(All);
