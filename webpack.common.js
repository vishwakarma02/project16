const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //to build html files

module.exports = {
    entry: {
        //add all entry points here
        //for separate module
        augray: './src/Augray/js/main.js', //js module for augray
        // . . . can add more module on above pattern
    },
    output: {
        filename: '[name].bundle.js', //each entry point compiled into file with extension of '.bundle.js'
        path: path.resolve(__dirname, 'dist') //path of compiled files
    },plugins: [
        //to build html files
        
        //augray.html
        new HtmlWebpackPlugin({
            filename: 'augray.html',
            template: path.join(__dirname, 'src/Augray','index.html'),
            minify: {
                //can add more options
                //options are listed here: https://github.com/kangax/html-minifier#options-quick-reference
                html5: true,
                removeComments: true,
                keepClosingSlash: true
            },
            chunks: ['augray']
        }),
        //add other html files with same options and specific chunks HERE
    ],
}