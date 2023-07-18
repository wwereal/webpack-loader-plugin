const { resolve } = require('path');
const AnalyzeWebpackPlugin = require('./plugins/analyze-webpack-plugin');
const DefineWebpackPlugin = require('./plugins/define-webpack-plugin');
const ResourceAnalyzerPlugin = require('./plugins/resource-analyzer-plugin');

module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        path: resolve(__dirname, './dist'),
        filename: 'js/[name].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: './loaders/hello-loader',
                        options: {
                            author: 'edgelin',
                            email: 'realiv@foxmail.com'
                        }
                    }, {
                        loader: './loaders/eslint-loader',
                        options: {
                            fix: true,
                        }
                    }
                ],
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: './loaders/markdown-loader',
                    },
                ],
            },
            {
                test: /\.html$/,
                use: ['html-loader', './loaders/html-minify-loader'] // 处理顺序 html-minify-loader => html-loader => webpack
            }
        ]
    },
    plugins: [
        new AnalyzeWebpackPlugin(),
        new DefineWebpackPlugin({
            BASE_URL: 'http://api.pro.com',
            ENV: process.env.NODE_ENV,
        }),
        new ResourceAnalyzerPlugin('dist/resource-analysis.json')
    ]
}