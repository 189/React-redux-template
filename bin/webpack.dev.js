const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConf = require('./webpack.base.js');

module.exports = merge(baseConf, {
    // eval-source-map - 每个模块使用 eval() 执行，并且 SourceMap 转换为 DataUrl 后添加到 eval() 中。
    // 初始化 SourceMap 时比较慢，但是会在重构建时提供很快的速度，并且生成实际的文件。
    // 行数能够正确映射，因为会映射到原始代码中。
    devtool : "eval-source-map",
    // 启用 HMR
    plugins : [new webpack.HotModuleReplacementPlugin()],
    devServer :  {
        // 告诉 dev-server 我们在使用 HMR
        hot: true, 
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        port: 9001,
        historyApiFallback : true,
        stats: {
            colors: true
        }
    }
});






