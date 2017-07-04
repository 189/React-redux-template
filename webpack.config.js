const path = require('path');
const fs = require('fs-extra');

const config = {
    entry : 'index.js',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : '[name].bundle.js'
    },
    module : {
        rules : [
            {
                test : '',
                use : ''
            }
        ]
    },
    plugins : [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};

module.exports = config;







