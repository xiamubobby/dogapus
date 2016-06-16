/**
 * Created by xiamubobby on 4/27/16.
 */
import electron = require("electron")
const app = electron.app;
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;
import theApp = require("./the_app");
import "./lokis/loki_manager";
import ipcSignals = require("./ipc_signals");
const BrowserWindow = electron.BrowserWindow;
import protocols = require("./protocols");
const MenuItem = electron.MenuItem;

let flashPath = "";
switch(process.platform) {
    case "linux":
        flashPath = `${__dirname.split("/").slice(0, -1).join("/")}/PepperFlash/linux/PepperFlash/libpepflashplayer.so`;
        // flashPath = `${__dirname}/PepperFlash/linux/PepperFlash/libpepflashplayer.so`;
        app.commandLine.appendSwitch('ppapi-flash-path', flashPath);
        break;
    case "darwin":
        flashPath = `${__dirname.split("/").slice(0, -1).join("/")}/PepperFlash/osx/PepperFlashPlayer.plugin`;
        // flashPath = `${__dirname}/PepperFlash/osx/PepperFlashPlayer.plugin`;
        app.commandLine.appendSwitch('ppapi-flash-path', flashPath);
        break;
    default:
        flashPath = `${__dirname.split("\\").slice(0, -1).join("\\")}\\PepperFlash\\win32\\PepperFlash\\pepflashplayer.dll`;
        // flashPath = `${__dirname}\\PepperFlash\\win32\\PepperFlash\\pepflashplayer.dll`;
        app.commandLine.appendSwitch('ppapi-flash-path', flashPath);
        break;
}
console.log(flashPath);

ipcMain.on("get-app-path", function (e) { e.returnValue = app.getAppPath() });

let template = [{
    label: "Account",
    submenu: [
        {
            label: "Logout",
            click: function () {
                mainWindow.webContents.send(ipcSignals.Signals[ipcSignals.Signals.AlertOnRenderer], "logged out~");
                //app.quit()
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
    const vipButton = new MenuItem({
        label: "做个魏阿婆",
        click: function () {
            protocols.interfaces.switchVip(function (err, request, body) {
                vipButton.label = function () {
                    if (body.nowStatus == "true") {
                        return "做个魏阿婆!";
                    } else {
                        return "再也不做魏阿婆啦!";
                    }
                }();
            });
        }
    });
    menu.items[0].
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