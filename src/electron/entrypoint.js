const { app, BrowserWindow } = require("electron");
const path = require("path");

console.log("Here!");

app.on("ready", () => {
    const w = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    const p = path.resolve("build", "index.html");
    console.log(p);
    w.loadFile(p);
});