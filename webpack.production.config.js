var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
process.env.NODE_ENV = 'production';
var config = {
    devtool: 'source-map',
    entry: __dirname + "/index.js",
    output: {
        path: __dirname + "/znkb",
        filename: "[name]-[hash].js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query:{
                    presets:['react','es2015'],
                    plugins:[
                        ['import',{
                            libraryName:'antd',
                            style:'css'
                        }]
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style','css!postcss')
            }
        ]
    },
    postcss: [
        require('autoprefixer')
    ],

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/tmpl/index.tmpl.html"
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[hash].css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':'"production"'
        })
    ]
    
}


module.exports = config;