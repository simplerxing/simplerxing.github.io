//使用单独的模块或文件来定义 action type 常量并不是必须的，甚至根本不需要定义。
//对于小应用来说，使用字符串做 action type 更方便些。不过，在大型应用中把它们显式地定义成常量还是利大于弊的。

//对于大的项目，将 action types 定义为常量有如下好处：

//帮助维护命名一致性，因为所有的 action type 汇总在同一位置。
//有时，在开发一个新功能之前你想看到所有现存的 actions 。而你的团队里可能已经有人添加了你所需要的action，而你并不知道。
//Action types 列表在 Pull Request 中能查到所有添加，删除，修改的记录。这能帮助团队中的所有人及时追踪新功能的范围与实现。
//如果你在 import 一个 Action 常量的时候拼写错了，你会得到 undefined 。在 dispatch 这个 action 的时候，Redux 会立即抛出这个错误，
//你也会马上发现错误

// 请求issues
export const REQUEST_ISSUES = 'REQUEST_ISSUES';

// 接收issues
export const RECEIVE_ISSUES = 'RECEIVE_ISSUES';

// 请求文章
export const REQUEST_ARTICLE = 'REQUEST_ARTICLE';

// 接收文章
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';