const merge = require('webpack-merge');
const baseConf = require('./webpack.base.js');

module.exports = merge(baseConf, {
    devtool : "eval-source-map"
})






