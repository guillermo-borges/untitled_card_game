module.exports = [
    {
        mode: "development",
        entry: "./electron/entrypoint.js",
        target: "electron-main",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: /
                }
            ]
        }
    }
];