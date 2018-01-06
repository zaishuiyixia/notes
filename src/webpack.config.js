var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname,"./js/app/index.js"),
    output: {
        path: path.resolve(__dirname, '../public/js'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings 
                }, {
                    loader: "css-loader" // translates CSS into CommonJS 
                }, {
                    loader: "less-loader" // compiles Less to CSS 
                }]
            }
        ]
    },
    resolve: {
        alias: {
            jquery: path.resolve(__dirname,'./js/lib/jquery-2.0.3.min.js'),
            mod: path.resolve(__dirname, './js/mod/'),
            less: path.resolve(__dirname,"./less")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};