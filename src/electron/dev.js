/*global __dirname*/

const path = require("path")
const { app, BrowserWindow, protocol } = require("electron")

require("electron-reload")("build")

app.on("ready", () => {
    const w = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    const rootPath = path.resolve("assets")
    console.log(rootPath)

    protocol.interceptFileProtocol("file", (req, callback) => {
        const url = req.url.replace("file://", "")
        console.log(url)
        if (url.startsWith("assets")) {
            const r = path.normalize(path.join(rootPath, url.substr(6)))
            callback({ path: r })
        } else {
            callback(req)
        }
    })

    const p = path.resolve("build", "index.html")
    console.log(p)
    w.loadFile(p)
})