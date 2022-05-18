### webpack相关依赖 
node版本10.13.0+ (本文12.22.1)

`mkdir webpack5-vue3`
`cd webpack5-vue3`
`npm i webpack webpack-cli webpack-merge webpack-dev-server -d`


新建webpack.config.js
```js
const path=require('path');
const HtmlWebapckPlugin = require('html-webpack-plugin');
module.exports={
    mode:"development",
    entry:  {
        index: './src/index.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'./dist')
    },
    cache: {
        type: 'filesystem', //使用文件缓存
    },
    devServer: {
        port: 9000
    },
    plugins: [
        new HtmlWebapckPlugin()
    ]
}
```

修改package.json的脚本
`build：webpack --config webpack.config.js`

`dev: webpack serve`

清理dist文件

执行npm run dev 报错

原因是webpack-dev-server最新版本有兼容性问题，如下图：


解决方法：npm uninstall webpack-dev-server ,
然后重新安装 "webpack-dev-server": "^3.11.2" 版本即可



对于低版本浏览器不支持es6语法，需要babel转义，安装相关依赖，新增.babelrc填写options配置文件（主要为了抽离配置）
```json
    "@babel/core": "^7.12.9",
    "@babel/plugin-transform-runtime": "^7.12.1",
    "@babel/preset-env": "^7.12.7",
    "babel-loader": "^8.2.1",
```

webpack.config.js继续补充babel相关配置


支持vue文件，需要安装vue、vue-loader和@vue/compiler-sfc

```json
    "@vue/compiler-sfc": "^3.0.2",
    "vue-loader": "^16.0.0-rc.1",
     "vue": "^3.0.2"
```
webpack.config.js继续补充vue相关配置

修改入口文件及新增app.vue


支持解析样式
```json
    "css-loader": "^5.0.1",
    "less": "^3.12.2",
    "less-loader": "^7.1.0",
    "style-loader": "^2.0.0"
```

css单独隔离,用于生产环境
```json
"mini-css-extract-plugin": "^1.3.1"
```

自动添加样式前缀, 需要配合.browserslistrc才生效
```json
    "postcss-loader": "^6.2.1",
    "autoprefixer": "^10.4.0",
```


修改代码后发现浏览器需要刷新才能更新，解决方案在webpack.config.js中增加： target: 'web'

静态资源引入不再需要url-loader，修改webpack.config.js

```js
    test: /\.(png|gif|jpg|jpeg|svg)$/,
    type: 'asset'
```


增加代码风格规范eslint

```json
    "eslint": "^8.4.1",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.25.3",
    "eslint-plugin-vue": "^8.2.0",
```

// 如果不想手动安装，可以通过：`npx eslint --init` 自动安装eslint相关依赖

手动修复代码比较麻烦，可以通过webpack插件自动修复

` npm install eslint-webpack-plugin --save-dev`

```js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    plugins: [
        new ESLintPlugin({
            fix: true, /* 自动帮助修复 */
            extensions: ['js', 'json', 'coffee', 'vue'],
            exclude: 'node_modules'
        })
    ]
}
```


以上基本完成所有配置，为了更好的体验继续优化
// 编译进度条
`npm i -D progress-bar-webpack-plugin`
// 打包体积分析
`npm i -D webpack-bundle-analyzer`

压缩css
`npm install -D css-minimizer-webpack-plugin`

压缩js
`const TerserPlugin = require('terser-webpack-plugin');`

分包 splitChunks
将业务代码和第三方库分开打包


通过externals将第三方不打包到bundle



如果想支持ts文件解析

`npm i typescript ts-loader --save-dev`
新增tsconfig.json文件，在webpack.config.js中添加loader配置即可


