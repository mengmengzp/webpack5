const path = require('path');
const HtmlWebapckPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
// const ESLintPlugin = require('eslint-webpack-plugin');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('./webpack.base');

const devConfig = {
    mode: 'development',
    target: 'web',
    entry: config.entries,
    output: {
        filename: '[name]/index.js',
        path: path.resolve(__dirname, './dist')
    },
    cache: {
        type: 'filesystem' // 使用文件缓存
    },
    devServer: {
        port: 9000
    },
    // cdn加载资源
    externalsType: 'script',
    externals: {
        myJquery: ['http://code.jquery.com/jquery-1.12.0.min.js', 'jQuery']
    },
    plugins: [
        new VueLoaderPlugin(),
        // 自动帮助修复
        // new ESLintPlugin({
        //     fix: true,
        //     extensions: ['js', 'json', 'coffee', 'vue'],
        //     exclude: 'node_modules'
        // }),
        // 进度条
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
        })
    ],
    module: {
        rules: config.rules
    }
};
config.output.forEach((item) => {
    const option = {
        filename: item.filename,
        template: item.template,
        chunks: item.chunks
    };
    devConfig.plugins.push(new HtmlWebapckPlugin(option));
});
module.exports = devConfig;
