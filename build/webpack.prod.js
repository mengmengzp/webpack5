const path = require('path');
// 自动生成html
const HtmlWebapckPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
// css分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清除dist目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 打包体积分析
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 压缩js
const TerserPlugin = require('terser-webpack-plugin');

// 入口出口配置
const config = require('./webpack.base');

const buildConfig = {
    mode: 'production',
    entry: config.entries,
    output: {
        filename: 'js/[chunkhash].js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash].css'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })
    ],
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                }, 'less-loader']
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
    },
    optimization: {
        splitChunks: {
            // include all types of chunks
            chunks: 'all',
            // 重复打包问题
            cacheGroups: {
                vendors: { // node_modules里的代码
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10, // 优先级
                    filename: 'js/vendors.[chunkhash].js',
                    enforce: true
                }
            }
        },
        minimizer: [
            new CssMinimizerPlugin({
                parallel: 4
            }),
            new TerserPlugin({
                parallel: 4,
                terserOptions: {
                    parse: {
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true
                    }
                }
            })
        ]
    },
    // cdn加载资源
    externalsType: 'script',
    externals: {
        myJquery: ['http://code.jquery.com/jquery-1.12.0.min.js', 'jQuery']
    }
};

config.output.forEach((item) => {
    const option = {
        filename: item.filename,
        template: item.template,
        chunks: item.chunks
    };
    buildConfig.plugins.push(new HtmlWebapckPlugin(option));
});

module.exports = buildConfig;
