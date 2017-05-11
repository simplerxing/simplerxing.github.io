var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var copy = require('quickly-copy-file');
var del = require('del');

// 开发环境
var isDev = function() {
  return process.env.NODE_ENV.trim() === 'development';
};

// 生产环境
var isProd = function() {
  return process.env.NODE_ENV.trim() === 'production';
};

copyAndDelFiles();

module.exports = {
  devtool: isProd() ? false : 'inline-source-map',
  entry: {
    index: [
      './src/js/index.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'redux',
      'redux-thunk',
      'nprogress',
      'jquery',
      'bootstrap'
    ]
  },
  output: {
    path: './dist',
    filename: isProd() ? '[name].[chunkhash:8].js' : '[name].js',
    chunkFilename: isProd() ? '[name].chunk.[chunkhash:8].js' : '[name].chunk.js',
    publicPath: isProd() ? './dist/' : '/dist/'
  },
  //test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
  //loader：loader的名称（必须）
  //include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
  //query：为loaders提供额外的设置选项（可选）
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      //loader: 'style!css'//添加对样式表的处理
      //感叹号的作用在于使同一文件能够使用不同类型的loader
      //ExtractTextPlugin.extract(options: loader | object)
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader', {
        publicPath: '.'
      })
    },{
      test:/\.css$/,
      loaders: ['style-loader','css-loader']
    },{
      test: /\.(png|jpg)$/,
      loader: 'file-loader?name=/[name].[hash:8].[ext]'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
    }, { 
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,  
        loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]' 
        }
    //显示bootstrap中css文件内引用的很多类型的字体文件和矢量图文件
    //{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    //{ test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
    //{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
    //{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  plugins: getPlugins()
};

// 复制和删除文件
function copyAndDelFiles() {
  var copyFile = '';

  // 复制文件
  if (isDev()) {
    copyFile = 'src/html/index_dev.html';
  } 

  if (isProd()) {
    copyFile = 'src/html/index.html';
  }

  copy(copyFile, 'index.html', function(error) {
    if (error) {
      return console.error(error);
    }
  });

  if (isProd()) {
    del(['dist']);
  }
}

// 获取配置
function getPlugins() {
  var plugins = [
    new webpack.DefinePlugin({
      __DEV__ : isDev(),
      __PROD__: isProd(),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV.trim())
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', isProd() ? 'vendor.[chunkhash:8].js' : 'vendor.js'),
    //ExtractTextPlugin：分离CSS和JS文件
    new ExtractTextPlugin(isProd() ? '[name].[chunkhash:8].css' : '[name].css'),
    //把jquery设置为全局变量
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ];

  if (isDev()) {
    plugins.push(
      new OpenBrowserPlugin({ url: 'http://localhost:8080/' })
    );
  }

  if (isProd()) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
          comments: false,
        },
        compress: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        title: 'simplerxing - blog',
        filename: '../index.html',
        template: './src/html/index.html'
      }),
      new WebpackMd5Hash()
    );
  }

  return plugins
}