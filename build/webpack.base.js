const path = require('path');
const glob = require('glob');

const setMPA = () => {
    const entry = {};
    const output = [];
    const entryFiles = glob.sync(path.join(__dirname, '../src/pages/*/main.js'));
    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/pages\/(.*)\/main\.js/);
            const pageName = match && match[1];
            entry[pageName] = entryFile;
            output.push(
                {
                    template: path.join(__dirname, `../src/pages/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName]
                }
            );
        });

    return {
        entry,
        output
    };
};

const { entry, output } = setMPA();

module.exports = {
    entries: entry,
    output: output,
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
};
