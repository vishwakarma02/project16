const BrowserSyncPlugin = require('browser-sync-webpack-plugin'); //to enable live reload on eny change
const merge = require('webpack-merge'); //to merge webpack.common.js into this config
const common = require('./webpack.common'); //webpack.common.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //to extract css in a different css files from js

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true  
    },
    plugins: [
        //use to watch any change in src folder
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3000,
                files: ['./dist/*html'],
                server: {baseDir: ['dist']}
            },
            {
                relaod: false //let webpack-dev-server handle reloading
            }
        ),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    }, //translate CSS into CommonJS
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    } //compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath : 'images'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                 test: /\.(woff|woff2|eot|ttf|otf)$/,
                 use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath : 'fonts'
                        }
                    }
                  ]
            },
            {
                //converting ES6 into ES5 to get support from IE also
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-syntax-dynamic-import']
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use:[
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'source:srcset', 'object:data']
                        }
                    }
                ]
            }
        ]
    }
})