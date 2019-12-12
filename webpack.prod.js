const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const HtmlWebpackChangeAssetsExtensionPlugin = require("html-webpack-change-assets-extension-plugin")
const modules = require("./webpack_modules")

module.exports = {
    entry: path.resolve("src", "app.js"),
    devtool: false,
    output: {
        path: path.resolve("build"),
        filename: "[name].[contenthash].js"
    },

    module: modules,

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve("src", "index.html"),
            filename: "index.html",
            inject: "body"
        }),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new UglifyJsPlugin({
            uglifyOptions: {
                comments: false,
                compress: {
                    drop_console: true
                }
            }
        }),

        new CompressionPlugin({
            test: /\.(js)$/
        }),

        new HtmlWebpackChangeAssetsExtensionPlugin()
    ]
}