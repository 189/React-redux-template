const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');

const config = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // Enable/Disable CSS Modules
                            modules: true,
                            // Enable/Disable Sourcemaps
                            sourceMap : true,
                            // Rewrite your urls with alias
                            alias : {}
                        }
                    }
                ]
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
                test : /\.(js|jsx)$/,
                use : [
                    { loader : 'babel-loader' }
                ]
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin()
    ]
};

module.exports = config;