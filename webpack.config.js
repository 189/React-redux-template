const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');

const config = {
    entry : './index.js',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : '[name].bundle.js'
    },
    module : {
        rules : [
            
        ]
    },
    plugins : [
        new webpack.optimize.UglifyJsPlugin()
    ]
};

module.exports = config;







