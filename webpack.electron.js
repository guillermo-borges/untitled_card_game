const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const modules = require("./webpack_modules")

module.exports = {
    mode: "development",
    entry: path.resolve("src", "app.js"),
    target: "electron-renderer",
    devtool: "source-map",

    output: {
        path: path.resolve("build"),
        filename: "bundle.js"
    },

    module: modules,

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve("src", "index.html"),
            filename: "index.html",
            inject: "body"
        }),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
}