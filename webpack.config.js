const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var address = require('address')
console.log('======本机ip地址'+address.ip());
console.log(process.env.NODE_ENV);

let config ={
    entry: __dirname + '/src/app.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.[hash].js' 
    },
    devtool: 'none',
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        inline: true,
        host:address.ip(),
        port:7001
    },
    module: {
        rules: [{
            test: /(\.js|\.jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader?importLoaders=1',
                'postcss-loader'
            ]
        }, ]
    },
    plugins: [
        new CleanWebpackPlugin(
            ['build/bundle.*.js','build/bundle.*.js','index.html'],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        ),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin("style.css")
    ]
}

console.log('当前环境:'+process.env['NODE_ENV'] );
if (process.env.NODE_ENV === 'production') {
    config.plugins=[...config.plugins, new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true,
            drop_console: false
        },
    })]
    console.log('生产环境,对代码进行压缩');
}

module.exports = config;