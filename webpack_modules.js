const sass = require("node-sass")
const sassUtils = require("node-sass-utils")(sass)

module.exports = {
    rules: [
        { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader", "eslint-loader"] },
        {
            test: /\.scss$/i,
            use: [
                { loader: "style-loader" },
                {
                    loader: "css-loader", options: {
                        modules: {
                            mode: "local",
                            localIdentName: "[path][name]__[local]--[hash:base64:5]"
                        }
                    }
                },
                {
                    loader: "sass-loader", options: {
                        sassOptions: {
                            includePaths: ["./src/scss"],
                            functions: {
                                "get($keys)": function (keys) {
                                    keys = keys.getValue().split(".")
                                    let result = require("./src/theme")
                                    let i
                                    for (i = 0; i < keys.length; i++) {
                                        result = result[keys[i]]
                                    }
                                    result = sassUtils.castToSass(result)
                                    return result
                                }
                            }
                        }
                    }
                },


            ]
        },

        {
            test: /\.css$/i,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" }
            ],
        },

        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                "file-loader",
            ],
        },
    ]
}