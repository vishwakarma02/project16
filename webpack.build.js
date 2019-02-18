let path = require('path');
const merge = require('webpack-merge'); //to merge more than one congiuration together
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //to extract css in a different css files from js
const CleanWebpackPlugin = require('clean-webpack-plugin'); //clean target folder before appendin
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //to minify/optimize css
const tinyPngWebpackPlugin = require('tinypng-webpack-plugin'); //to minify images using tinypng

//importing webpack.common.js
//which includes all common configurations
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'js/[name].bundle.js', //each entry point compiled into file with extension of '.bundle.js'
        path: path.resolve(__dirname, 'build') //path of compiled files
    },
    plugins: [
        new CleanWebpackPlugin(['build']), //remove older build files before creating new one

        //to extract css in a different css files from js, so that
        //even if js fail to load css will work.
        // Advantages -
        // -Async loading
        // -No duplicate compilation (performance)
        // -Easier to use
        // -Specific to CSS
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),

        //to optimize/minify css files
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true //A boolean indicating if the plugin can print messages to the console, defaults to true
        }),

        // //optimize images using tinypng
        new tinyPngWebpackPlugin({
            key:"yA2fsBv5SvSzUnkWcVmOj1oMYEOJltKu",//can be Array, eg:['your key 1','your key 2'....]
            ext: ['png', 'jpeg', 'jpg'],//img ext name
        })
    ],
    module: {
        rules: [
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
                "css-loader",
                'postcss-loader',
                'sass-loader'
              ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
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
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-syntax-dynamic-import'],
                        },
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