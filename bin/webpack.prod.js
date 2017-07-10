
const merge = require('webpack-merge');
const baseConf = require('./webpack.base');
const webpack = require('webpack');
const fs = require('fs-extra');
const path = require('path');

module.exports = merge(baseConf, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            // sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0),
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                warnings : false
            },
            comments: false,
        }),
        function() {
            this.plugin("done", function(stats) {
                fs.writeFileSync( path.join(__dirname, "stats.json"), JSON.stringify(stats.toJson(), null, 4));
            });
        }
    ],
    // 生成完整的 SourceMap，输出为独立文件。
    // 由于在 bundle 中添加了引用注释，所以开发工具知道在哪里去找到 SourceMap。
    devtool : "source-map",
});





