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
    const name = exportsMap[nodeEnv]; 
    
    if(typeof name === 'undefined'){
        throw new Error('没有对应' + name + "的配置文件");
    }
    
    const conf = require(`./bin/webpack.${name}`);

    fs.writeFile(path.resolve(process.cwd(), 'snapshoot'), JSON.stringify(conf, null, 4), function(err){
        if(err){
            throw err;
        }
        console.log('Snapshoot make sucess');
    });
    return conf;
};
