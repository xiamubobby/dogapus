/**
 * Created by xiamubobby on 4/27/16.
 */
import electron = require("electron")
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
import theApp = require("./the_app");
import "./lokis/loki_manager";

let flashPath = "";
switch(process.platform) {
    case "linux":
        flashPath = `${__dirname.split("/").slice(0, -1).join("/")}/PepperFlash/linux/PepperFlash/libpepflashplayer.so`;
        app.commandLine.appendSwitch('ppapi-flash-path', flashPath);
        break;
    case "darwin":
        flashPath = `${__dirname.split("/").slice(0, -1).join("/")}/PepperFlash/osx/PepperFlashPlayer.plugin`;
        flashPath = `${__dirname}/PepperFlash/osx/PepperFlashPlayer.plugin`;
        console.log(flashPath);
        app.commandLine.appendSwitch('ppapi-flash-path', flashPath);
        break;
    default:
        flashPath = `${__dirname.split("\\").slice(0, -1).join("\\")}\\PepperFlash\\win32\\PepperFlash\\pepflashplayer.dll`;
        app.commandLine.appendSwitch('ppapi-flash-path', flashPath);
        break;
}

ipcMain.on("get-app-path", function (e) { e.returnValue = app.getAppPath() });

let template = [{
    label: "Account",
    submenu: [
        {
            label: "Login",
            click: function () {
                app.quit()
            }
        }
    ]
}];

let mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    } else {
        app.quit();
    }
});

app.on('ready', function() {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 960,
        icon: `${__dirname}dogapus.png`,
        webSecurity: false
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.webContents.session.clearStorageData(function(){
        console.log("return to the shadows")
    });

    if(theApp.isDebug()) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
    mainWindow.on("close", function (e) {
        mainWindow.webContents.session.clearStorageData(function(){
            console.log("return to the shadows")
        });
    });
});