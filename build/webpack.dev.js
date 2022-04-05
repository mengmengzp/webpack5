const path=require('path');
const HtmlWebapckPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
    mode: 'development',
    target: 'web',
    entry:  {
        index: path.join(__dirname, '../src/index.js')
    },
    output:{
        filename:'[name].js',
        libraryTarget: 'umd',
        path:path.resolve(__dirname,'./dist')
    },
    cache: {
        type: 'filesystem', //使用文件缓存
    },
    devServer: {
        // inline: true,
        port: 9000
    },
    plugins: [
        new HtmlWebapckPlugin({
            template: path.join(__dirname, '../src/index.html'),
        }),
        new VueLoaderPlugin(),
        // 自动帮助修复
        new ESLintPlugin({
            fix: true, 
            extensions: ['js', 'json', 'coffee', 'vue'],
            exclude: 'node_modules'
        }),
        // 进度条
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
        })
    ],
    resolve: {
        // 将 `.ts` 添加为一个可解析的扩展名。
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },'less-loader']
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg)$/,
                type: 'asset'
            },
            {
                test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
                type: 'asset'
            }
        ]
    }
}