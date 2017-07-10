const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV;

const exportsMap = {
    'production' : 'prod',
    'development' : 'build',
    'devserver' : 'dev'
};

if(typeof nodeEnv === 'undefined'){
    throw new Error('没有设置环境变量');
}

module.exports = function(env){
    const config = exportsMap[nodeEnv]; 
    if(typeof config === 'undefined'){
        throw new Error('没有对应' + config + "的配置文件");
    }
    return require(`./webpack.${config}`);
};
