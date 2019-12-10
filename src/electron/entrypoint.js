const { app, BrowserWindow } = require("electron");

app.on("ready", () => {
    const w = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    w.loadFile("../build/index_electron.html");
});