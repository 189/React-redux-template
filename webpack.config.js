const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

const config = {
    entry: {
        main : './index.js'
    },
    
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
                exclude: /(node_modules|bower_components)/,
                use : [
                    { loader : 'babel-loader', options : {} }
                ]
            }
        ]
    },

    resolve : {
        modules : ['node_modules'],
        alias : {},
        extensions : ['.css', '.scss', '.js', '.jsx', '.vue', '*']
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename : './_index.html',
            template : './_index.html',
            inject : true,
            showErrors : true,
            chunks : ['main']
        })
    ]
};

if(env === 'production'){
    let plugs = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ];
    config.plugins.unshift(...plugs);
}

module.exports = config;