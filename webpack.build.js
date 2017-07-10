const merge = require('webapck-merge');
const baseConf = require('./webpack.base.js');

module.exports = merge(baseConf, {
    devtool : "eval-source-map"
})






