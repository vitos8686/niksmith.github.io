var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var Webpack = require('webpack');
var path = require('path');
var development = JSON.parse(process.env.BUILD_DEV || 1);
var definePlugin = new Webpack.DefinePlugin({
    __DEV__: development
});

module.exports = {
    entry: {
        app: development ? ["webpack/hot/dev-server", "./src/app.js"] : ["./src/app.js"]
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "uglify!babel-loader"
            },
            {
                test: /\.css$/,
                loader: development ? 'style!css' : ExtractTextPlugin.extract('css')
            },
            {
                test: /img.*\.(png|jpg)$/,
                loader: "file-loader?name=images/[name].[ext]"
            }
        ]
    },
    plugins: development ? [definePlugin] : [
        new ExtractTextPlugin("bundle.css"),
        definePlugin,
        new CopyWebpackPlugin([
            {from: './src/images', to: './dist/images'}
        ])
    ]
};