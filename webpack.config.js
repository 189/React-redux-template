const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV;

const config = {
    entry: {
        main: './index.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: [{
            //             loader: 'style-loader'
            //         },
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 // Enable/Disable CSS Modules
            //                 modules: true,
            //                 // Enable/Disable Sourcemaps
            //                 sourceMap: true,
            //                 // Rewrite your urls with alias
            //                 alias: {}
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
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

    plugins: [
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
            template: './_index.html',
            inject: true,
            showErrors: true,
            chunks: ['main']
        })
    ]
};

if (env === 'production') {
    let plugs = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ];
    config.plugins.unshift(...plugs);
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;