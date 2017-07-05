const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env){
    console.log(env);

    const config = {
        entry: {
            main: './src/index.js'
        },

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].bundle.js'
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
                template: './src/_index.html',
                inject: true,
                showErrors: true,
                chunks: ['main']
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(env.production ? 'production' : '')
                }
            })
        ]
    };

    if(!env.production){
        // eval-source-map - 每个模块使用 eval() 执行，并且 SourceMap 转换为 DataUrl 后添加到 eval() 中。
        // 初始化 SourceMap 时比较慢，但是会在重构建时提供很快的速度，并且生成实际的文件。
        // 行数能够正确映射，因为会映射到原始代码中。
        config.devtool = "eval-source-map";
    }
    else {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warning : false
                }
            })
        );
        // 生成完整的 SourceMap，输出为独立文件。
        // 由于在 bundle 中添加了引用注释，所以开发工具知道在哪里去找到 SourceMap。
        config.devtool = "source-map";
    }


    return config;
}