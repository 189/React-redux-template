const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: ["babel-polyfill", './src/index.js']
    },

    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", 'sass-loader']
                })
            },
            {
                test : /\.html$/,
                use : [
                    { loader : 'html-loader', options: { minimize: false } } 
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test : /\.(woff|woff2|eot|ttf|otf)$/,
                use : ['url-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {}
                }]
            }
        ]
    },

    resolve: {
        modules: ['node_modules'],
        alias: {},
        extensions: ['.css', '.scss', '.js', '.jsx', '.vue', '*']
    },

    externals : [],

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // 该配置假定你引入的 vendor 存在于 node_modules 目录中
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
        new webpack.optimize.CommonsChunkPlugin({
            //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
            name: 'manifest'
        }),
        new ExtractTextPlugin({
            filename : '[name].css',
            // Extract from all additional chunks too 
            // When using CommonsChunkPlugin and there are extracted chunks (from ExtractTextPlugin.extract) in the commons chunk, allChunks must be set to true
            allChunks : true,
            // Disables order check (useful for CSS Modules!)
            ignoreOrder : false
        }),
        new HtmlWebpackPlugin({
            filename: './_index.html',
            template: './src/_index.html',
            inject: true,
            showErrors: true,
            chunks: ['vendor', 'manifest', 'main'],
            chunksSortMode: 'dependency'
        })
    ]
};
