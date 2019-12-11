module.exports = {
    rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        {
            test: /\.scss$/i,
            use: [
                { loader: "style-loader" },
                {
                    loader: "css-loader", options: {
                        modules: {
                            mode: 'local',
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                },
                {
                    loader: "sass-loader", options: {
                        sassOptions: {
                            includePaths: ['./src/scss']
                        }
                    }
                }
            ]
        },

        {
            test: /\.css$/i,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" }
            ],
        }
    ]
};