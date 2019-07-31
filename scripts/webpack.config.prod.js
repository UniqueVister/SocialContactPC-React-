//webpack4以上提取文件用   mini-css-extract-plugin

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取css文件
const CopyPlugin = require('copy-webpack-plugin'); // 拷贝文件


module.exports = {
    entry: './src/main.js',

    output: {
        path: path.resolve(process.cwd(), 'dist'), // process.cwd()
        filename: 'js/[name][chunkHash:8].js'
    },

    plugins: [
        new htmlWebpackPlugin({
            title: 'react-learn',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name][chunkHash:8].css'
        }),
        new CopyPlugin([
            { from: path.resolve(process.cwd(), 'src/static/'), to: path.resolve(process.cwd(), 'dist/static/') }
        ])
    ],

    module: {
        rules: [{
                test: /\.css$/,
                use: [

                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'

                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {

                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {

                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4000,
                            name: 'images/[name].[ext]',
                            publicPath: '/'
                        }
                    }
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer: {
        port: 3000,
        open: true
    }
}