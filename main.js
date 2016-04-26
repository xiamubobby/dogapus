/**
 *
 * Created by natsuki on 16/4/20.
 */
'use strict';

const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain
const BrowserWindow = electron.BrowserWindow;
// console.log(process.platform)
switch(process.platform) {
    case "linux":
        app.commandLine.appendSwitch('ppapi-flash-path', `${__dirname}./PepperFlash/nix/PepperFlash/libpepflashplayer.so`);
        break;
    case "darwin":
        app.commandLine.appendSwitch('ppapi-flash-path', `${__dirname}./PepperFlash/osx/PepperFlashPlayer.plugin`);
        break;
    default:
        app.commandLine.appendSwitch('ppapi-flash-path',`${__dirname}\\PepperFlash\\win32\\PepperFlash\\pepflashplayer.dll`)
        break;
}

var z = require("./lokis/loki_manager")
console.log(z.getAccessToken())
z.updateAccessToken("jugggar")
console.log(z.getAccessToken())

ipcMain.on("get-app-path", function (e) {
    e.returnValue = app.getAppPath()
});

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    } else {
        app.quit();
    }
});

app.on('ready', function() {
    console.log(require("./tpumdtst.js"))
    mainWindow = new BrowserWindow({
        width: 1440, height: 960,
        "webSecurity": false
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.webContents.session.clearStorageData(function(){
        console.log("return to the shadows")
    });
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
    mainWindow.on("close", function (e) {
        mainWindow.webContents.session.clearStorageData(function(){
            console.log("return to the shadows")
        });
    });
});
